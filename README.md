# Z-Specification 1.1 (annotated)

Another rendering of Graham Nelson's [_The Z-Machine Standards Document_](http://inform-fiction.org/zmachine/standards/z1point1), using [`mdbook`](https://rust-lang.github.io/mdBook/index.html) as the book renderer.

Use `mdbook serve` for local developement.


## TO-DO

- [ ] clean up images (from low-res GIF to something sharper)

- [ ] Change layout to "inline" the section numbers?  The original format "wastes" a lot of vertical space on lines that contain _only_ section numbers.  I'm pretty sure there are better technical documentation layouts than that.

- [ ] Improve the generated anchor references?  Periods are omitted, which means that "1.12" and "1.1.2" are both converted to "#112"... that's just a bad design. Better would be for any consecutive non-alphanumeric characters to become `-` or `_`.

- [ ] I looked at using a real section mark (§) instead of `S`, but `mdbook` can't handle bolding it... but perhaps with a "real" section indicator the bolding is unnecessary?

- [ ] Markdown appears to be insufficient for the documentation formatting I want (like showing my annotations); I'm currently leaning towards [AsciiDoc](https://docs.asciidoctor.org/asciidoc/latest/) and [Asciidoctor](https://docs.asciidoctor.org/asciidoctor/latest/) instead.  For now, however, I'm going to complete the Markdown conversion.

## Snippets

These are used in converting the plain/copied text...

### Headings

```
^([0-9]+(\.[0-9]+){5})$
###### $1

```
