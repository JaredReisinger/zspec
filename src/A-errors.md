# Appendix A. Error messages and debugging

![](./images/iconaa.gif)

Older interpreters, such as **ITF**, are extremely curt when an error condition is reached (for example, an illegal opcode). It was assumed that Infocom's shipped story files were bug-free, which is mostly true, so that errors could only arise through a bug elsewhere in the interpreter.

In debugging Inform games, though, many error conditions can arise and it is extremely helpful to report these as fully as possible. These include:

1. An illegal opcode being hit;

1. A call to what can't be a routine (because the initial byte is not between 0 and 15);

1. A jump or call to an address beyond the size of the story file;

1. An attempt to [**`print_obj`**](./15-opcodes-dictionary.md#print_obj), or otherwise access, an object which doesn't exist, such as object number 0.

1. An attempt to write to, or get the property length of, a nonexistent property.

1. An attempt to access an attribute outside the range 0 to 31 or 0 to 47 (depending on Version). (But note that Infocom's _Sherlock_ contains a bug causing it to try setting or clearing attribute number 48.)

1. Division by zero. The player sometimes then has the annoying task of working out where the error took place in source code. Providing a stack back-trace would be a help.

As mentioned in [**S**3](./03-text.md), it's helpful to screen out any illegal ZSCII characters between 0 and 31 which are accidentally printed: crashes can be very mysterious when they cause interpreters to send control codes to the terminal.

In addition, an interpreter might provide options for keeping track of maximum stack usage and the typical number of opcodes executed between each read from the keyboard. (But watching these is a time-wasting activity, so they should be options.)

Finally, infinite loops fairly often happen, as in any programming language. On a system without pre-emptive multi-tasking, this may lock up the whole machine, as the usual way that porters implement multi-tasking is to return control to the host operating system only when the keyboard is read. This can be avoided by providing a point in the code which could return control to the OS from time to time (say, every 2000 instructions).

---

A number of post-Infocom games have been released which contain errors, most often trying to perform illegal operations on object 0. Many interpreters silently ignored these errors, which can make it very to notice and track down bugs.

It is desirable for modern interpreters to be able to notify players about these bugs, but this can also ruin gameplay. It is highly recommended, then, that interpreters have four levels of error checking, selectable by the user (through a command-line or menu option, or similar):

- Never report the bug.

- Report the first instance of each type of error.

- Report every error.

- Fatal error and close the interpreter on any error.
