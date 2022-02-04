# 13. The dictionary and lexical analysis

![](./images/icon13.gif)

## 13.1 Storage

The dictionary table is held in static memory and its byte address is stored in the word at **`$08`** in the header.

## 13.2 Header

The table begins with a short header:

```
 n     list of keyboard input codes   entry-length  number-of-entries
byte  ------n bytes-----------------      byte         2-byte word
```

The keyboard input codes are "word-separators": typically (and under Inform mandatorily) these are the ZSCII codes for full stop, comma and double-quote. Note that a space character (32) should never be a word-separator. The "entry length" is the length of each word's entry in the dictionary table. (It must be at least 4 in Versions 1 to 3, and at least 6 in later Versions.)

### 13.2.1

Note that the word-separators table can only contain codes which are defined in ZSCII for both input and output.

## 13.3 Entries (V1 to V3)

In Versions 1 to 3, each word has an entry in the form

```
 encoded text of word        bytes of data
------- 4 bytes ------   (entry length-4) bytes
```

The interpreter ignores the bytes of data (presumably the game's parser will use them). The encoded text contains 6 Z-characters (it is always padded out with Z-character 5's to make up 4 bytes: see [**S**3](./03-text.md)). The text may include spaces or other word-separators (though, if so, the interpreter will never match any text to the dictionary word in question: surprisingly, this can be useful and is a trick used in the Inform library).

## 13.4 Entries (later versions)

In Versions 4 and later, the encoded text has 6 bytes and always contains 9 Z-characters.

## 13.5 Ordering

The word entries follow immediately after the dictionary header and must be given in numerical order of the encoded text (when the encoded text is regarded as a 32 or 48-bit binary number with most-significant byte first). It must not contain two entries with the same encoded text.

## 13.6 Lexical analysis

Lexical analysis takes place in two circumstances: on request of a **`tokenise`** opcode (in which case it can use any dictionary table it likes, in the format above) and during acceptance of a game command (in which case the standard dictionary is used).

### 13.6.1

First, the text is broken up into words. Spaces divide up words and are otherwise ignored. Word separators also divide words, but each one of them is considered a word in its own right. Thus, the erratically-spaced text "fred,go fishing" is divided into four words:

```
fred / , / go / fishing
```

### 13.6.2

Each word is then encoded as a Z-machine string in dictionary form, and searched for in the dictionary.

### 13.6.3

A "parse table" is then written, recording the number of words, the length and position of each word and the dictionary address of each word which is recognised. For the format, see the **`read`** opcode.

---

## Remarks

Usually (under Inform, mandatorily) there are three bytes of data in the word entries, so that dictionary entry lengths are 7 and 9 in the early and late Z-machine, respectively.

It is essential that dictionary entries are in numerical order of the bytes of encrypted text so that interpreters can search the dictionary efficiently (e.g. by a binary-chop algorithm). Because the letters in A0 are in alphabetical order, because the bits are ordered in the right way and because the pad character 5 is less than the values for the letters, the numerical ordering corresponds to normal English alphabetical order for ordinary words. (For instance `an` comes before `anaconda`.)

Both Infocom and Inform-compiled games contain words whose initial character is not a letter (for instance, `#record`).

Linards Ticmanis reports that some of Infocom's interpreters convert question marks to spaces before lexical analysis. This is not Standard behaviour. (Thus, typing `What is a grue?` into _Zork I_ no longer works: the player must type `What is a grue` instead.)
