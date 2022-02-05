# 1. The memory map

![](./images/icon01.gif)

## 1.1 Regions of memory

The memory map of the Z-machine is an array of bytes with "byte addresses" running from 0 upwards. This is divided into three regions: "dynamic", "static" and "high". Dynamic memory begins from byte address `$00000` and runs up to the byte before the byte address stored in the word at `$0e` in the header. (Dynamic memory must contain at least 64 bytes.) Static memory follows immediately on. Its extent is not defined in the header (or anywhere else), though it must end by the last byte of the story file or by byte address `$0ffff` (whichever is lower). High memory begins at the "high memory mark" (the byte address stored in the word at `$04` in the header) and continues to the end of the story file. The bottom of high memory may overlap with the top of static memory (but not with dynamic memory).

### 1.1.1

Dynamic memory can be read or written to (either directly, using  [**`loadb`**](./15-opcodes-dictionary.md#loadb),  [**`loadw`**](./15-opcodes-dictionary.md#loadw),  [**`storeb`**](./15-opcodes-dictionary.md#storeb) and  [**`storew`**](./15-opcodes-dictionary.md#storew), or indirectly with opcodes such as  [**`insert_obj`**](./15-opcodes-dictionary.md#insert_obj) and  [**`remove_obj`**](./15-opcodes-dictionary.md#remove_obj)).

#### 1.1.1.1

By tradition, the first 64 bytes are known as the "header". The contents of this are given later but note that games are not permitted to alter many bits inside it.

#### 1.1.1.2

It is legal for games to alter any of the tables stored in dynamic memory above the header, provided they leave the tables in legal states.

### 1.1.2

Static memory can be read using the opcodes  [**`loadb`**](./15-opcodes-dictionary.md#loadb) and  [**`loadw`**](./15-opcodes-dictionary.md#loadw). It is illegal for a game to attempt to write to static memory.

### 1.1.3

Except for its (possible) overlap with static memory, high memory cannot be directly accessed at all by a game program. It contains routines, which can be called, and strings, which can be printed using  [**`print_paddr`**](./15-opcodes-dictionary.md#print_paddr).

### 1.1.4

The maximum permitted length of a story file depends on the Version, as follows:

| Versions | Maximum size |
| :------: | :----------: |
|   1--3   |     128K     |
|   4--5   |     256K     |
|   6--8   |     512K     |

## 1.2 Addresses

There are three kinds of address in the Z-machine, all of which can be stored in a 2-byte number: byte addresses, word addresses and packed addresses.

### 1.2.1

A byte address specifies a byte in memory in the range 0 up to the last byte of static memory.

### 1.2.2

A word address specifies an even address in the bottom 128K of memory (by giving the address divided by 2). (Word addresses are used only in the abbreviations table.)

### 1.2.3

**[1.0]** A packed address specifies where a routine or string begins in high memory. Given a packed address _P_, the formula to obtain the corresponding byte address _B_ is:

| Calculation | Versions                   |
| :---------- | :------------------------- |
| 2P          | 1, 2 and 3                 |
| 4P          | 4 and 5                    |
| 4P + 8R_O   | 6 and 7, for routine calls |
| 4P + 8S_O   | 6 and 7, for print_paddr   |
| 8P          | 8                          |

_**`R_O`**_ and _**`S_O`**_ are the routine and strings offsets (specified in the header as words at `$28` and `$2a`, respectively).

**An example memory map of a small game**

| Area    | Address | Description                        |
| :------ | :------ | :--------------------------------- |
| Dynamic | 00000   | header                             |
|         | 00040   | abbreviation strings               |
|         | 00042   | abbreviation table                 |
|         | 00102   | property defaults                  |
|         | 00140   | objects                            |
|         | 002f0   | object descriptions and properties |
|         | 006e3   | global variables                   |
|         | 008c3   | arrays                             |
| Static  | 00b48   | grammar table                      |
|         | 010a7   | actions table                      |
|         | 01153   | preactions table                   |
|         | 01201   | adjectives table                   |
|         | 0124d   | dictionary                         |
| High    | 01a0a   | Z-code                             |
|         | 05d56   | static strings                     |
|         | 06ae6   | end of file                        |

---

## Remarks

Inform never compiles any overlap between static and high memory (it places all data tables in dynamic memory). However, many Infocom games group tables of static data just above the high memory mark, before routines begin; some, such as _Nord 'n' Bert..._, interleave static data between routines, so that static memory actually overlaps code; and a few, such as _Seastalker_ release 15, even contain routines placed below the high memory mark. (The original idea behind the high memory mark was that everything below it should be stored in the interpreter's RAM, while what was above could reasonably be kept in "virtual memory", i.e., loaded off disc as needed.)

Note that the total of dynamic plus static memory must not exceed 64K. (In fact, 64K minus 2 bytes.) This is the most serious limitation on the Z-machine.

Throughout the specification, Versions 7 and 8 are identical to Version 5 except as stated at [1.1.4](#114) and [1.2.3](#123) above.
```
