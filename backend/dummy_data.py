# dummy_data.py

WORDS = [
    # A
    "apple", "application", "appreciate", "around",
    
    # B
    "banana", "band", "base", "beautiful",
    
    # C
    "car", "care", "cat", "category",
    
    # D
    "dog", "data", "dark", "danger",
    
    # E
    "elephant", "energy", "echo", "example",
    
    # F
    "fish", "fun", "function", "friend",
    
    # G
    "green", "good", "great", "group",
    
    # H
    "house", "happy", "help", "home",
    
    # I
    "important", "idea", "image", "inside",
    
    # J
    "jump", "just", "job", "join",
    
    # K
    "kind", "keep", "know", "key",
    
    # L
    "love", "light", "large", "learn",
    
    # M
    "make", "music", "money", "morning",
    
    # N
    "nature", "nice", "name", "number",
    
    # O
    "open", "over", "other", "office",
    
    # P
    "people", "place", "play", "perfect",
    
    # Q
    "question", "quick", "quiet", "quality",
    
    # R
    "right", "read", "remember", "really",
    
    # S
    "smile", "small", "simple", "strong",
    
    # T
    "time", "table", "together", "think",
    
    # U
    "under", "use", "understand", "unique",
    
    # V
    "voice", "view", "visit", "value",
    
    # W
    "water", "world", "work", "wonderful",
    
    # X
    "x-ray",
    
    # Y
    "year", "yellow", "young", "yes",
    
    # Z
    "zero", "zone", "zoo"
];

def get_suggestions(query: str):
    query = query.lower()
    suggestions = [word for word in WORDS if word.startswith(query)]
    return suggestions
