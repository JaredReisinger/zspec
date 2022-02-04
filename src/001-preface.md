# Preface

The Z-machine was created on a coffee table in Pittsburgh in 1979. It is an imaginary computer whose programs are adventure games, and is well-adapted to its task, implementing complex games remarkably compactly. They were still perhaps 100K long, too large for the memory of the home computers of their day, and the Z-machine seems to have made the first usage of virtual memory on a microcomputer. Further ahead of its time was the ability to efficiently save and restore the entire execution state.

The design's cardinal principle is that any game is 100% portable to different computers: that is, any legal program exactly determines its behaviour. This portability is largely made possible by a willingness to constrain maximum as well as minimum levels of performance (for instance, dynamic memory allocation is impossible).

Infocom's catalogue continues to be sold and to be played under interpreter programs, either original Infocom ones or more recent and generally better freeware ones. About [130 story](http://inform-fiction.org/zmachine/standards/z1point1/appf.html) files compiled by Infocom's compiler `Zilch` survive and since 1993 very many more story files have been created with the Inform design system.

Eight Versions of the Z-machine exist, and the first byte of any "story file" (that is: any Z-machine program) gives the Version number it must be interpreted under.

## Standardisation

The majority of opcode names used in this document were agreed between 1994 and 1995 as a standard set by Mark Howell, author of the disassembler `Txd` (part of the **Ztools** suite of utility programs), and Graham Nelson, author of the assembly level of Inform. They do not correspond to Infocom's opcode names.

The first vesion of this Standard was drawn up in November 1995, drawing on a rougher description written in 1993 and, before that, sketches of table formats by Mike Threepoint and others. It formalised what different interpreter writers regard as the Z-machine, guaranteeing a reliable and well-featured platform for writers of new games. The initial 0.2 Standard was followed by the 1.0 Standard, which contained mostly corrections and clarifications, but also added some new features.

This third version of the Standard was initially put together by Kevin Bracey and Jason C. Penney and proposed on the Z-Machine Mailing List in December 2001. After much discussion, and nine drafts, the final list of changes to the Standard was uploaded to the if-archive in May 2006. This 2014 document adds no new material to that final draft, and is merely a merging of those changes to the main Standard.

The main additions in the 1.1 Standard are:

- Better colour support, giving games access to 32,768 colours as opposed to the previous 11. Version 6 games may also make use of the new ‘transparent' background colour.

- Version 6 games may now hint to the interpreter that it is safe to make changes to the display in a backing store and flush them to the screen later, rather than making changes directly to the screen. In a program carrying out a complex layered graphical composition, this may speed up the process.

- The **`save`** and **`restore`** opcodes have a new optional operand that allow the game to control whether the interpreter prompts for a filename or executes the intructions silently.

- The optional operand removed from **`set_font`** in the previous Standard has been reinstated.

There are three companion documents are attached to this Standard.

- _**Quetzal**_ by Martin Frost, defines a standard format for saved-game files, the purpose of which is to allow a player to save a game using one interpreter, and then restore and continure playing on a new interpreter, or even an entirely new machine.

- _**Blorb**_ by Andrew Plotkin is a standard for a "resources" file to accompany or encapsulate a Z-machine game, neatly packaging up sound and graphics in modern formats.

- _**The Treaty of Babel**_ is a standard for bibliographic information for interactive fiction games. The aim is to provide a unified way to identify and describe story files of many different internal formats. The Treaty is not "owned" by any individual, but by a committee of representatives from each of the pieces of software which have signed up.

Standard interpreters are not _required_ to support these standards, since they do not affect Z-Machine behaviour, but interpreter-writers are strongly encouraged to consider it.

## So what is "standard"?

To call itself "Standard", an interpreter should (as far as anyone knows) obey this document exactly for every Version of the Z-machine it claims to interpret. Interpreters need not provide optional features suggested in the "remarks" sections, and need not make their source code public. Each edition of this document has a Revision number, somewhat like the JFIF identification number used by the JPEG standard. A standard interpreter should communicate its revision number in three ways:

- To someone downloading it from the Internet: by including it in its filename.

- To the player: for instance by means of an "information" option on a menu, or in an initialisation sequence.

- To the game: by writing it into bytes in the header which were always left zero before this standard was devised (see [**S**11](./01-memory-map.md)). A game compiled with Inform library 5/12 or later prints the revision number in its banner (if this isn't 0.0).

Few arbitrary choices have been made in writing this document. Where Infocom's own shipped interpreters disagree, or contain manifest bugs, it has usually been possible to decide which was "correct". Elsewhere, minimum levels of performance have been invented where necessary. (For example, a minimum call-stack size is needed for programmers to be sure of what level of recursion is safe.)

Those paragraphs which genuinely extend the Infocom format are marked **[_n_._m_]**, where _**n**_ and _**m**_ are the major and minor version numbers for the Standard in which the feature was added. In any event, Infocom's original shipped interpreters do not conform to this standard document, because of bugs or because of slight variations between the Inform output format and Infocom's.

## Notation

Hexadecimal numbers are written with an initial dollar, as in `$ff`, while binary numbers are written with a double-dollar as in `$$11011`, according to Inform conventions. The bits in a byte are numbered 0 to 7, 0 being the least significant and the top bit, 7, the most.

Story files are mechanically best identified by their release number and serial code, which are written into the header information at the bottom of Z-machine memory. The release number can be anything between 0 and 65535 but is usually between 1 and 100. The serial code can consist of any six textual characters but is usually the date of compilation, arranged `YYMMDD`: thus `970619` refers to June 19th, 1997.

Paul David Doherty, in his extensive investigations into Infocom's released games, introduced the notation

**_Release number_._Serial code_**


to identify particular story files: for example the first production copy of ‘Enchanter' is `10.830810`. This notation is used throughout the Standard when individual Infocom files need to be referred to.

## Where are all the grammar tables?

The Z-machine has some lexical acuity but it doesn't contain a full parser: it's like a computer without an operating system. A game program has to contain its own parser and the tables this uses are not part of the formal Z-machine specification. (Many Infocom games have similar parsing table formats simply because, until Version 6, they used an evolving version of the _Zork I_ parser. A quite different parser was used in Version 6.) Inform's parsing table formats are documented in the _Inform Technical Manual_. For the usual format of Infocom's parsing tables, see the **Ztools** utility `Infodump`.

## Acknowledgements

> There is an obvious resemblance between an unreadable script and a secret code; similar methods can be employed to break both. But the differences must not be overlooked. The code is deliberately designed to baffle the investigator; the script is only puzzling by accident.
>
> John Chadwick, _**The Decipherment of Linear B**_

The Z-machine was originally devised by Joel Berez and Marc Blank in 1979. Marc Blank made most of the Version 4 extensions, and Version 5 was created by Dave Lebling (with contributions from others including Brian Moriarty, Duncan Blanchard and Linde Dynneson). Version 6 was largely the work of Tim Anderson and Dave Lebling.

In the reverse direction, decipherment is mostly due to the InfoTaskForce (David Beazley, George Janczuk, Peter Lisle, Russell Hoare and Chris Tham), Matthias Pfaller, Mike Threepoint, Mark Howell, Paul David Doherty and Stefan Jokisch. Only a few of the pieces in the jigsaw were placed by myself.

I gratefully acknowledge the help of Paul David Doherty and Mark Howell, who each read drafts of this paper and sent back detailed corrections; also, of Stefan Jokisch and Marnix Klooster who have put a great deal of work into the fine detail of the specification; and of all those who commented on the circulated draft. Mistakes and misunderstandings remain my own.

_Graham Nelson_\
_15 November 1995_

Kevin Bracey and Stefan Jokisch discovered most of the mistakes in Standard 0.2, in developing the first Version 6 interpreters of the modern age: **Zip2000** and **Frotz**. Matthew Russotto and Mark Knibbs supplied helpful information about Infocom's own Version 6 interpreters. Stefan also kindly read and commented on numerous drafts of the present revision. Finally, discussion about this document was greatly assisted by the Z-Machine Mailing List, organised by Marnix Klooster.

_Graham Nelson_\
_22 June 1997_

The majority of the clarifications and updates in this latest revision are the work of Kevin Bracey and Jason C. Penney. Thanks go also to the members of the (now defunct) Z-Machine Mailing List, and those of the intfiction.org forum, especially Dannii Willis, for bringing to light issues with my initial revision. Special thanks to Andrew Plotkin for his notes, advice and general help while working on this revised document.

_David Fillmore_\
_21 February 2014_

The Z-Machine Standard Version 1.1 was the work of Kevin Bracey & Jason C. Penney. The initial document went through several drafts before arriving at the finished document, thanks to the comments and advice of the members of the Z-Machine Mailing List.

_David Fillmore_\
_24 February 2014_
