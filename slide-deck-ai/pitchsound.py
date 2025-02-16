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

# Configure Google Gemini API
genai.configure(api_key=GEMINI_API_KEY)

def transcribe_audio(audio_data):
    try:
        audio_io = io.BytesIO(audio_data)
        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(audio_io)
        
        if transcript.status == aai.TranscriptStatus.error:
            return f"Transcription failed: {transcript.error}"
        return transcript.text
    except Exception as e:
        return f"Error in transcription: {str(e)}"

def analyze_sentiment(text):
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"Analyze the sentiment of the following text and provide a breakdown of different moods (joy, confidence, sadness, anger, fear, disgust):\n\n{text}"
    
    response = model.generate_content(prompt)
    sentiment_analysis = response.text if response.text else "Sentiment analysis failed"
    
    sentiment_scores = {
        'Joy': sentiment_analysis.lower().count('joy'),
        'Confidence': sentiment_analysis.lower().count('confidence'),
        'Sadness': sentiment_analysis.lower().count('sadness'),
        'Anger': sentiment_analysis.lower().count('anger'),
        'Fear': sentiment_analysis.lower().count('fear'),
        'Disgust': sentiment_analysis.lower().count('disgust')
    }
    
    # Plot sentiment analysis results
    fig = px.pie(values=list(sentiment_scores.values()), names=list(sentiment_scores.keys()),
                 title='Sentiment Analysis', hole=0.3)
    fig.update_traces(textinfo='percent+label', pull=[0.1, 0, 0, 0, 0, 0])
    st.plotly_chart(fig, use_container_width=True)
    
    return sentiment_scores

def refine_speech(text, sentiment):
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"Refine the following elevator pitch based on the sentiment analysis provided:\n\nPitch: {text}\n\nSentiment Analysis: {sentiment}\n\nProvide guidance to improve the pitch."
    
    response = model.generate_content(prompt)
    return response.text if response.text else "Speech refinement failed"

def main():
    st.title("Elevator Pitch Analyzer")
    
    # Record audio
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
        
        start_time = time.time()
        
        # Transcribe audio
        transcript_text = transcribe_audio(audio_bytes)
        st.subheader("Transcription:")
        st.write(transcript_text)
        
        if "failed" in transcript_text.lower():
            st.error("Transcription failed. Please try again.")
            return
        
        # Sentiment Analysis
        sentiment = analyze_sentiment(transcript_text)
        st.subheader("Sentiment Analysis:")
        st.write(sentiment)
        
        # Refine Speech
        refined_speech = refine_speech(transcript_text, sentiment)
        st.subheader("Refined Speech:")
        st.write(refined_speech)
        
        duration = time.time() - start_time
        st.write(f"Completed in {duration:.2f} seconds")

if __name__ == "__main__":
    main()
