# import streamlit as st
# from audio_recorder_streamlit import audio_recorder
# import assemblyai as aai
# import io
# from dotenv import load_dotenv
# import os

# # Load environment variables from .env file
# load_dotenv()

# # Set AssemblyAI API Key
# aai.settings.api_key = os.getenv("ASSEMBLY_API_KEY")

# def transcribe_audio(audio_data):
#     audio_io = io.BytesIO(audio_data)
#     transcriber = aai.Transcriber()
#     transcript = transcriber.transcribe(audio_io)
    
#     if transcript.status == aai.TranscriptStatus.error:
#         return f"Transcription failed: {transcript.error}"
#     return transcript.text

# def main():
#     st.title("Audio Recorder and Transcription")

#     # Record audio for a fixed duration of 10 seconds
#     audio_bytes = audio_recorder(
#         energy_threshold=(-1.0, 1.0),
#         pause_threshold=120.0,
#         sample_rate=41000,
#         text="",
#         recording_color="#e8b62c",
#         neutral_color="#6aa36f",
#         icon_name="microphone",
#         icon_size="6x"
#     )

#     if audio_bytes:
#         st.audio(audio_bytes, format="audio/wav")
#         st.success("Recording completed!")

#         # Store the audio in a variable
#         audio_data = audio_bytes

#         # Display the audio data
#         st.write("Audio data stored in variable:")

#         # Transcribe the audio data
#         transcript_text = transcribe_audio(audio_data)
#         st.subheader("Transcription:")
#         st.write(transcript_text)

# if __name__ == "__main__":
#     main()
import streamlit as st
from audio_recorder_streamlit import audio_recorder
import assemblyai as aai
import io
from dotenv import load_dotenv
import os
import time
import requests
import json
import plotly.express as px
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# Set API Keys
aai.settings.api_key = os.getenv("ASSEMBLY_API_KEY")
TEXTTODATA_API_KEY = os.getenv("Texttodata_API")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def transcribe_audio(audio_data):
    audio_io = io.BytesIO(audio_data)
    transcriber = aai.Transcriber()
    transcript = transcriber.transcribe(audio_io)
    
    if transcript.status == aai.TranscriptStatus.error:
        return f"Transcription failed: {transcript.error}"
    return transcript.text

def analyze_sentiment(text):
    client = genai.Client(api_key=GEMINI_API_KEY)
    prompt = f"Analyze the sentiment of the following text and provide a breakdown of different moods (joy, confidence, sadness, anger, fear, disgust):\n\n{text}"
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )
    sentiment_analysis = response.text

    # Extract sentiment values from the response (this is a placeholder, adjust based on actual response format)
    sentiment = {
        'Joy': sentiment_analysis.count('joy'),
        'Confidence': sentiment_analysis.count('confidence'),
        'Sadness': sentiment_analysis.count('sadness'),
        'Anger': sentiment_analysis.count('anger'),
        'Fear': sentiment_analysis.count('fear'),
        'Disgust': sentiment_analysis.count('disgust')
    }

    # Plot sentiment analysis
    labels = ['Joy', 'Confidence', 'Sadness', 'Anger', 'Fear', 'Disgust']
    values = [
        sentiment.get('Joy', 0),
        sentiment.get('Confidence', 0),
        sentiment.get('Sadness', 0),
        sentiment.get('Anger', 0),
        sentiment.get('Fear', 0),
        sentiment.get('Disgust', 0)
    ]
    fig = px.pie(values=values, names=labels, title='Sentiment Analysis', hole=0.3)
    fig.update_traces(textinfo='percent+label', pull=[0.1, 0, 0, 0, 0, 0])
    fig.update_layout(annotations=[dict(text='Moods', x=0.5, y=0.5, font_size=20, showarrow=False)])
    st.plotly_chart(fig, use_container_width=True)

    return sentiment

def refine_speech(text, sentiment):
    client = genai.Client(api_key=GEMINI_API_KEY)
    prompt = f"Refine the following elevator pitch based on the sentiment analysis provided:\n\nPitch: {text}\n\nSentiment Analysis: {sentiment}\n\nProvide guidance to improve the pitch."
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )
    return response.text

def main():
    st.title("Elevator Pitch Analyzer")

    # Record audio for a fixed duration of 1 minute
    audio_bytes = audio_recorder(
        energy_threshold=(-1.0, 1.0),
        pause_threshold=60.0,
        sample_rate=41000,
        text="",
        recording_color="#e8b62c",
        neutral_color="#6aa36f",
        icon_name="microphone",
        icon_size="6x"
    )

    if audio_bytes:
        st.audio(audio_bytes, format="audio/wav")
        st.success("Recording completed!")

        # Store the audio in a variable
        audio_data = audio_bytes

        # Display the audio data
        st.write("Audio data stored in variable:")

        # Start the timer
        start_time = time.time()

        # Transcribe the audio data
        transcript_text = transcribe_audio(audio_data)
        st.subheader("Transcription:")
        st.write(transcript_text)

        # Perform sentiment analysis
        sentiment = analyze_sentiment(transcript_text)
        st.subheader("Sentiment Analysis:")
        st.write(sentiment)

        # Refine the speech
        refined_speech = refine_speech(transcript_text, sentiment)
        st.subheader("Refined Speech:")
        st.write(refined_speech)

        # Stop the timer
        end_time = time.time()
        duration = end_time - start_time
        st.write(f"Transcription, sentiment analysis, and speech refinement completed in {duration:.2f} seconds")

if __name__ == "__main__":
    main()