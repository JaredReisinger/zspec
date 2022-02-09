# Z-Machine Standards Document 1.1 (annotated)

Another presentation of Graham Nelson’s [_The Z-Machine Standards Document_](http://inform-fiction.org/zmachine/standards/z1point1), using [`Antora`](https://antora.org) as the book renderer. Rather than reiterate the reasons for doing this _here_, take a look at [the foreword itself](./modules/ROOT/pages/0001-foreword.adoc).

Use `npm run dev` for edit/refresh local developement.

## Technical details

I started by converting the original HTML document to Markdown, which was then fed into [`mdbook`](https://rust-lang.github.io/mdBook/index.html) to generate the site. This functioned well, but Markdown is really insufficient for the task of “real” documentation. Sooner or later you run into something that Markdown simply can’t represent. There are various and competing Markdown variants, but those all feel like they are just postponing the problem. (And don’t get me wrong, I love Markdown for the majority of basic notes/readme-style docs!) I found [AsciiDoc](https://docs.asciidoctor.org/asciidoc/latest/) and [`asciidoctor`](https://asciidoctor.org/) and began the conversion from Markdown to AsciiDoc. Fairly quickly, my desire for a shared navigation pane along with multi-page presentation meant I needed to look a bit more… and I found [Antora](https://antora.org/), which is what the current iteration is using.

For hosting, I’m taking advantage of [Netlify](https://netlify.com)’s free hosting for static sites.

---

## TO-DO

- [ ] clean up images (from low-res GIF to something sharper)

- [ ] Change layout to “inline” the section numbers? The original format “wastes” a lot of vertical space on lines that contain _only_ section numbers. I’m pretty sure there are better technical documentation layouts than that.

- [X] Improve the generated anchor references? Periods are omitted, which means that “1.12″ and”1.1.2″ are both converted to “#112…” that’s just a bad design. Better would be for any consecutive non-alphanumeric characters to become `-` or `_`.

- [ ] I looked at using a real section mark (§ ) instead of `S`, but `mdbook` can’t handle bolding it… but perhaps with a “real” section indicator the bolding is unnecessary?

- [X] Markdown appears to be insufficient for the documentation formatting I want (like showing my annotations); I’m currently leaning towards [AsciiDoc](https://docs.asciidoctor.org/asciidoc/latest/) and [Asciidoctor](https://docs.asciidoctor.org/asciidoctor/latest/) instead. For now, however, I’m going to complete the Markdown conversion.
