// // I'd love to use Typescript/ESM, but this is quick for now...
const luxon = require("luxon");

const { DateTime } = luxon;

module.exports = function (registry) {
  registry.inlineMacro("date", function () {
    const self = this;

    // `parent` is the parent element, `target` is the value immediately after
    // the macro invocation, and `arg` is the positional/named arguments in
    // square brackets: `date:TARGET[ARG]`, where the original text of
    //
    //    date:2020-01-01[%j,lang-en]
    //
    // would come in as:
    //
    //    parent, '2020-01-01', { lang: 'en', '%positional': ['%j'] }
    self.process(function (parent, target, args) {
      // Parse target as a date, prefer more-rigorous formats (should we try
      // sugar date?)  Actually, for now we *insist* that it's an ISO date.
      const date = DateTime.fromISO(target, { zone: "utc" });

      if (!date.isValid) {
        throw new Error(date.invalidExplanation);
      }

      // extract the formatting info from args...
      let {
        format,
        localeString,
        locale,
        "%positional": positional,
      } = args || {};

      locale = locale && typeof locale == "string" ? { locale } : {};

      // We expect either an explicit 'localeString' descriptor or 'format'
      // string, or either one as a positional (i.e. we have to infer what kind
      // it is).  More than one of these is not allowed.
      const count =
        (format ? 1 : 0) +
        (localeString ? 1 : 0) +
        (positional ? positional.length : 0);

      if (count > 1) {
        throw new Error(
          `only one of 'localeString', 'format' or a positional parameter is allowed; you provided ${JSON.stringify(
            args
          )}`
        );
      }

      // We now know we only have one "kind" to deal with.  We start by checking
      // the positional arg if present and mapping it into one of the other two.
      if (positional && positional.length === 1) {
        if (typeof DateTime[positional] === "object") {
          localeString = positional;
        } else {
          format = positional;
        }
      }

      let text;

      // Now handle the "format" case... otherwise, there's either a
      // localeString or nothing, which we format using the default localeString
      // behavior.
      if (format) {
        text = date.toFormat(format, locale);
      } else {
        let localeOpts = {};

        if (localeString) {
          localeOpts = DateTime[localeString];
          if (!localeOpts || typeof localeOpts !== "object") {
            throw new Error(
              `"${localeString}" is unknown locale string; try "DATE_FULL" or "DATETIME_SHORT"`
            );
          }
        }

        text = date.toLocaleString({ ...localeOpts, ...locale });
      }

      return self.createInline(parent, "quoted", text).convert();
    });
  });
};
