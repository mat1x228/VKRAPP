from spellchecker import SpellChecker

spell = SpellChecker(language='ru')

def correct_spelling(text):
    words = text.split()
    corrected_words = []
    for word in words:
        corrected_word = spell.correction(word)
        corrected_words.append(corrected_word)
    corrected_text = ' '.join(corrected_words)
    return corrected_text

some_text = "превет!"
corrected_text = correct_spelling(some_text)
print(corrected_text)