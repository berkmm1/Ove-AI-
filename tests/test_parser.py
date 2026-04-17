from src.parser import parse

def test_parse_simple():
    assert parse("a,b,c") == ["a", "b", "c"]

def test_parse_empty():
    assert parse("") == [""]

def test_parse_no_comma():
    assert parse("abc") == ["abc"]

def test_parse_trailing_comma():
    assert parse("a,b,") == ["a", "b", ""]
