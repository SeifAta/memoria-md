from pydantic import BaseModel
from typing import List


class Flashcard(BaseModel):
    front: str
    back: str


class FlashcardDeck(BaseModel):
    title: str
    flashcards: List[Flashcard]