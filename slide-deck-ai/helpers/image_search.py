import logging
import os
import random
from io import BytesIO
from typing import Union, Tuple, Literal, List, Dict
from urllib.parse import urlparse, parse_qs

import requests
from dotenv import load_dotenv

load_dotenv()

REQUEST_TIMEOUT = 12
MAX_PHOTOS = 5  # Increased to give more options for pitch deck slides
PITCH_DECK_ASPECTS = ['business', 'professional', 'corporate', 'modern']

# Image categories commonly needed in pitch decks
PITCH_DECK_IMAGE_CATEGORIES = {
    'team': ['team meeting', 'business team', 'professional team', 'diverse team'],
    'product': ['product showcase', 'technology', 'innovation'],
    'market': ['market growth', 'business chart', 'market analysis'],
    'competition': ['competition', 'business strategy', 'market leader'],
    'traction': ['business success', 'growth chart', 'achievement'],
    'vision': ['future technology', 'innovation', 'business vision']
}

logging.getLogger('urllib3').setLevel(logging.ERROR)

def enhance_search_query(query: str, slide_type: str = None) -> str:
    """
    Enhances the search query with pitch deck-relevant terms.
    
    :param query: Original search query
    :param slide_type: Type of pitch deck slide (e.g., 'team', 'product')
    :return: Enhanced search query
    """
    enhanced_query = query
    
    # Add relevant business context if not already present
    if not any(aspect in query.lower() for aspect in PITCH_DECK_ASPECTS):
        enhanced_query = f"{query} business professional"
    
    # Add slide-specific enhancements
    if slide_type and slide_type.lower() in PITCH_DECK_IMAGE_CATEGORIES:
        relevant_terms = PITCH_DECK_IMAGE_CATEGORIES[slide_type.lower()]
        enhanced_query = f"{enhanced_query} {random.choice(relevant_terms)}"
    
    return enhanced_query

def search_pexels(
        query: str,
        size: Literal['small', 'medium', 'large'] = 'large',  # Default changed to large for better quality
        per_page: int = MAX_PHOTOS,
        slide_type: str = None
) -> dict:
    """
    Searches for pitch deck-appropriate images on Pexels.
    
    :param query: The search query for finding images
    :param size: The size of the images
    :param per_page: No. of results per page
    :param slide_type: Type of pitch deck slide (e.g., 'team', 'product')
    :return: The JSON response from the Pexels API
    """
    enhanced_query = enhance_search_query(query, slide_type)
    
    url = 'https://api.pexels.com/v1/search'
    headers = {
        'Authorization': os.getenv('PEXEL_API_KEY'),
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:10.0) Gecko/20100101 Firefox/10.0',
    }
    params = {
        'query': enhanced_query,
        'size': size,
        'page': 1,
        'per_page': per_page,
        'orientation': 'landscape'  # Better for pitch deck slides
    }
    
    response = requests.get(url, headers=headers, params=params, timeout=REQUEST_TIMEOUT)
    response.raise_for_status()
    
    return response.json()

def get_photo_url_from_api_response(
        json_response: dict,
        preferred_aspect_ratio: float = 16/9  # Standard presentation aspect ratio
) -> Tuple[Union[str, None], Union[str, None]]:
    """
    Return the most suitable photo for a pitch deck slide.
    
    :param json_response: The JSON response
    :param preferred_aspect_ratio: Desired aspect ratio for the image
    :return: The selected photo URL and page URL
    """
    page_url = None
    photo_url = None
    
    if 'photos' in json_response and json_response['photos']:
        photos = json_response['photos']
        
        # Score photos based on suitability for pitch deck
        scored_photos = []
        for photo in photos:
            score = 0
            if 'src' in photo:
                width, height = extract_dimensions(photo['src'].get('original', ''))
                if width and height:
                    # Score based on aspect ratio similarity
                    current_ratio = width / height if height else 0
                    ratio_diff = abs(current_ratio - preferred_aspect_ratio)
                    score = 1 / (1 + ratio_diff)
                
                # Prefer larger images
                if 'large' in photo['src']:
                    score += 0.5
                
            scored_photos.append((score, photo))
        
        # Select the best scoring photo
        if scored_photos:
            best_photo = max(scored_photos, key=lambda x: x[0])[1]
            page_url = best_photo.get('url')
            if 'src' in best_photo:
                photo_url = best_photo['src'].get('large') or best_photo['src'].get('original')
    
    return photo_url, page_url

# Rest of the functions remain the same
def get_image_from_url(url: str) -> BytesIO:
    headers = {
        'Authorization': os.getenv('PEXEL_API_KEY'),
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:10.0) Gecko/20100101 Firefox/10.0',
    }
    response = requests.get(url, headers=headers, stream=True, timeout=REQUEST_TIMEOUT)
    response.raise_for_status()
    return BytesIO(response.content)

def extract_dimensions(url: str) -> Tuple[int, int]:
    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)
    width = int(query_params.get('w', [0])[0])
    height = int(query_params.get('h', [0])[0])
    return width, height

if __name__ == '__main__':
    # Example usage for pitch deck
    print(
        search_pexels(
            query='team collaboration',
            slide_type='team'
        )
    )