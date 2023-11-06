<p>File has been commented using the HIGHLIGHT extension and I would recommend installing it. <br>
The custom configuration I added is as such:</p>

```
        ,
        "((?:<!-- *)?(?:#|// @|//|./\\*+|<!--|--|\\* @|{!|{{!--|{{!) *(?:IMP|IMPORTS)(?:\\s*\\([^)]+\\))?:?)((?!\\w)(?: *-->| *\\*/| *!}| *--}}| *}}|(?= *(?:[^:]//|/\\*+|<!--|@|--|{!|{{!--|{{!))|(?: +[^\\n@]*?)(?= *(?:[^:]//|/\\*+|<!--|@|--(?!>)|{!|{{!--|{{!))|(?: +[^@\\n]+)?))": {
            "filterFileRegex": ".*(?<!CHANGELOG.md)$",
            "decorations": [
                {
                    "overviewRulerColor": "#accac5",
                    "backgroundColor": "#accac5",
                    "color": "#1f1f1f",
                    "fontWeight": "bold"
                },
                {
                    "backgroundColor": "#accac5",
                    "color": "#1f1f1f"
                }
            ]
        },
        "((?:<!-- *)?(?:#|// @|//|./\\*+|<!--|--|\\* @|{!|{{!--|{{!) *(?:SECTION|SEC)(?:\\s*\\([^)]+\\))?:?)((?!\\w)(?: *-->| *\\*/| *!}| *--}}| *}}|(?= *(?:[^:]//|/\\*+|<!--|@|--|{!|{{!--|{{!))|(?: +[^\\n@]*?)(?= *(?:[^:]//|/\\*+|<!--|@|--(?!>)|{!|{{!--|{{!))|(?: +[^@\\n]+)?))": {
            "filterFileRegex": ".*(?<!CHANGELOG.md)$",
            "decorations": [
                {
                    "overviewRulerColor": "#33dabe",
                    "backgroundColor": "#33dabe",
                    "color": "#1f1f1f",
                    "fontWeight": "bold"
                },
                {
                    "backgroundColor": "#33dabea9",
                    "color": "#1f1f1f"
                }
            ]
        },
        "((?:<!-- *)?(?:#|// @|//|./\\*+|<!--|--|\\* @|{!|{{!--|{{!) *(?:EXPLAIN|EX)(?:\\s*\\([^)]+\\))?:?)((?!\\w)(?: *-->| *\\*/| *!}| *--}}| *}}|(?= *(?:[^:]//|/\\*+|<!--|@|--|{!|{{!--|{{!))|(?: +[^\\n@]*?)(?= *(?:[^:]//|/\\*+|<!--|@|--(?!>)|{!|{{!--|{{!))|(?: +[^@\\n]+)?))": {
            "filterFileRegex": ".*(?<!CHANGELOG.md)$",
            "decorations": [
                {
                    "overviewRulerColor": "#33da44",
                    "backgroundColor": "#33da44",
                    "color": "#1f1f1f",
                    "fontWeight": "bold"
                },
                {
                    "backgroundColor": "#33da44c4",
                    "color": "#1f1f1f"
                }
            ]
        }
```

<p>If you paste this piece of code into the highlight reg configuration file, following the last item (as you can see, this piece of code is intended to be placed after the end of the preestablished reg parameters(items) since it has a comma at the beginning), but if you feel more secure placing it in the midst of the rest of the items, you know, you do you, to each their own, just make sure to place a comma after the end of this and take out the beginning comma in case you did not delete the one in the given settings code. <br> This should mark all comments correctly and will provide helpful aid in the journey to understand the intricacies of this humble, but outstandishingly educative piece of code.
</p>

---

<p>==IMP|IMPORT== = These two, though I mostly use imp (WHICH DOES NOT MEAN IMPORTANT, JUST IMPORTS) for ease and length.<br>
<br>
==SECTION|SEC== = Just separators, mostly dividers and they tend to have descriptive titles.<br>
<br>
==EXPLAIN|EX== = Lengthier explanations for concrete parts of the code.<br>
<br>
<br>
The formatting is still in development, and commenting will be resumed once I can get some
clarity of mind. :) Thank you and read ahead! </p>