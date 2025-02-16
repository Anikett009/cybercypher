import os
import pathlib
import sys
from typing import List, Tuple, Dict, Optional
import json

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from transformers import BertTokenizer, BertModel

sys.path.append('..')
sys.path.append('../..')

from global_config import GlobalConfig

# Common pitch deck sections and related terms
PITCH_DECK_SECTIONS = {
    'problem': ['problem', 'challenge', 'pain point', 'issue', 'difficulty'],
    'solution': ['solution', 'product', 'service', 'platform', 'innovation'],
    'market': ['market', 'opportunity', 'industry', 'segment', 'target'],
    'business_model': ['revenue', 'monetization', 'pricing', 'business model', 'sales'],
    'competition': ['competition', 'competitors', 'market analysis', 'advantage'],
    'traction': ['growth', 'metrics', 'achievements', 'milestones', 'progress'],
    'team': ['team', 'founders', 'leadership', 'expertise', 'experience'],
    'financials': ['finance', 'revenue', 'projection', 'funding', 'investment']
}

tokenizer = BertTokenizer.from_pretrained(GlobalConfig.TINY_BERT_MODEL)
model = BertModel.from_pretrained(GlobalConfig.TINY_BERT_MODEL)

class IconCache:
    """Cache for storing icon metadata and usage statistics"""
    def __init__(self, cache_file: str = 'icon_cache.json'):
        self.cache_file = cache_file
        self.cache = self._load_cache()
    
    def _load_cache(self) -> Dict:
        if os.path.exists(self.cache_file):
            with open(self.cache_file, 'r') as f:
                return json.load(f)
        return {'usage_count': {}, 'section_matches': {}}
    
    def save_cache(self):
        with open(self.cache_file, 'w') as f:
            json.dump(self.cache, f)
    
    def update_usage(self, icon_name: str, section: str):
        if icon_name not in self.cache['usage_count']:
            self.cache['usage_count'][icon_name] = 0
        self.cache['usage_count'][icon_name] += 1
        
        if section not in self.cache['section_matches']:
            self.cache['section_matches'][section] = {}
        if icon_name not in self.cache['section_matches'][section]:
            self.cache['section_matches'][section][icon_name] = 0
        self.cache['section_matches'][section][icon_name] += 1
        
        self.save_cache()

icon_cache = IconCache()

def get_icons_list() -> List[str]:
    """Get a list of available icons."""
    items = pathlib.Path('../' + GlobalConfig.ICONS_DIR).glob('*.png')
    items = [
        os.path.basename(str(item)).removesuffix('.png') for item in items
    ]
    return items

def get_embeddings(texts) -> np.ndarray:
    """Generate embeddings for texts using BERT."""
    inputs = tokenizer(texts, return_tensors='pt', padding=True, max_length=128, truncation=True)
    outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).detach().numpy()

def save_icons_embeddings():
    """Generate and save embeddings for icon file names and section keywords."""
    # Generate embeddings for icons
    file_names = get_icons_list()
    print(f'{len(file_names)} icon files available...')
    file_name_embeddings = get_embeddings(file_names)
    
    # Generate embeddings for pitch deck sections
    section_keywords = [' '.join(keywords) for keywords in PITCH_DECK_SECTIONS.values()]
    section_embeddings = get_embeddings(section_keywords)
    
    # Save all embeddings
    np.save(GlobalConfig.EMBEDDINGS_FILE_NAME, file_name_embeddings)
    np.save(GlobalConfig.ICONS_FILE_NAME, file_names)
    np.save('section_embeddings.npy', section_embeddings)
    
    # Pre-compute section-icon matches
    similarities = cosine_similarity(section_embeddings, file_name_embeddings)
    section_matches = {
        section: [file_names[idx] for idx in np.argsort(sim)[-5:]]
        for section, sim in zip(PITCH_DECK_SECTIONS.keys(), similarities)
    }
    
    with open('section_matches.json', 'w') as f:
        json.dump(section_matches, f)

def load_saved_embeddings() -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Load precomputed embeddings and icon file names."""
    file_name_embeddings = np.load(GlobalConfig.EMBEDDINGS_FILE_NAME)
    file_names = np.load(GlobalConfig.ICONS_FILE_NAME)
    section_embeddings = np.load('section_embeddings.npy')
    return file_name_embeddings, file_names, section_embeddings

def find_icons_for_pitch_deck(
    keywords: List[str], 
    slide_sections: Optional[List[str]] = None
) -> List[Tuple[str, float]]:
    """
    Find relevant icons for pitch deck slides with context awareness.
    
    :param keywords: List of keywords to find icons for
    :param slide_sections: Optional list of slide section types (e.g., 'problem', 'solution')
    :return: List of tuples containing (icon_name, confidence_score)
    """
    keyword_embeddings = get_embeddings(keywords)
    file_name_embeddings, file_names, section_embeddings = load_saved_embeddings()
    
    # Initial similarity computation
    similarities = cosine_similarity(keyword_embeddings, file_name_embeddings)
    
    # Adjust scores based on section context if provided
    if slide_sections:
        for i, section in enumerate(slide_sections):
            if section in PITCH_DECK_SECTIONS:
                # Get section-specific keywords
                section_keywords = PITCH_DECK_SECTIONS[section]
                section_keyword_embeddings = get_embeddings(section_keywords)
                section_similarities = cosine_similarity(section_keyword_embeddings, file_name_embeddings)
                
                # Blend similarities with section context
                similarities[i] = 0.7 * similarities[i] + 0.3 * section_similarities.mean(axis=0)
    
    # Get top matches with confidence scores
    results = []
    for i, sim_row in enumerate(similarities):
        top_idx = np.argmax(sim_row)
        icon_name = file_names[top_idx]
        confidence = sim_row[top_idx]
        
        # Update usage statistics
        if slide_sections and i < len(slide_sections):
            icon_cache.update_usage(icon_name, slide_sections[i])
        
        results.append((icon_name, float(confidence)))
    
    return results

def get_section_suggestions(section: str, num_suggestions: int = 3) -> List[str]:
    """Get commonly used icons for a specific pitch deck section."""
    if section in icon_cache.cache['section_matches']:
        matches = icon_cache.cache['section_matches'][section]
        return sorted(matches.items(), key=lambda x: x[1], reverse=True)[:num_suggestions]
    return []

if __name__ == '__main__':
    # Example usage for pitch deck
    keywords = ['market growth', 'team expertise', 'product features']
    sections = ['market', 'team', 'solution']
    
    icons_with_confidence = find_icons_for_pitch_deck(keywords, sections)
    for (keyword, section, (icon, confidence)) in zip(keywords, sections, icons_with_confidence):
        print(f'Keyword: {keyword} (Section: {section})')
        print(f'Selected icon: {icon} (Confidence: {confidence:.2f})')
        print('Section suggestions:', get_section_suggestions(section))
        print()