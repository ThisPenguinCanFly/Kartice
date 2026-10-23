
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const folder = "./Kaado";

const kanaMap = {
    A: "あ", I: "い", U: "う", E: "え", O: "お",
    KA: "か", KI: "き", KU: "く", KE: "け", KO: "こ",
    SA: "さ", SHI: "し", SI: "し", SU: "す", SE: "せ", SO: "そ",
    TA: "た", CHI: "ち", TI: "ち", TSU: "つ", TU: "つ",
    TE: "て", TO: "と",
    NA: "な", NI: "に", NU: "ぬ", NE: "ね", NO: "の",
    HA: "は", HI: "ひ", FU: "ふ", HU: "ふ", HE: "へ", HO: "ほ",
    MA: "ま", MI: "み", MU: "む", ME: "め", MO: "も",
    YA: "や", YU: "ゆ", YO: "よ",
    RA: "ら", RI: "り", RU: "る", RE: "れ", RO: "ろ",
    WA: "わ", WO: "を", N: "ん",
    GA: "が", GI: "ぎ", GU: "ぐ", GE: "げ", GO: "ご",
    ZA: "ざ", ZI: "じ", JI: "じ", ZU: "ず", ZE: "ぜ", ZO: "ぞ",
    DA: "だ", DI: "ぢ", DU: "づ", DE: "で", DO: "ど",
    BA: "ば", BI: "び", BU: "ぶ", BE: "べ", BO: "ぼ",
    PA: "ぱ", PI: "ぴ", PU: "ぷ", PE: "ぺ", PO: "ぽ",
    JA: "じゃ", JU: "じゅ", JO: "じょ",
    KYA: "きゃ", KYU: "きゅ", KYO: "きょ",
    SHA: "しゃ", SHU: "しゅ", SHO: "しょ",
    CHA: "ちゃ", CHU: "ちゅ", CHO: "ちょ",
    NYA: "にゃ", NYU: "にゅ", NYO: "にょ",
    HYA: "ひゃ", HYU: "ひゅ", HYO: "ひょ",
    MYA: "みゃ", MYU: "みゅ", MYO: "みょ",
    RYA: "りゃ", RYU: "りゅ", RYO: "りょ",
    GYA: "ぎゃ", GYU: "ぎゅ", GYO: "ぎょ",
    BYA: "びゃ", BYU: "びゅ", BYO: "びょ",
    PYA: "ぴゃ", PYU: "ぴゅ", PYO: "ぴょ"
};

const files = await readdir(folder);

const pngFiles = files.filter(file =>
    file.toLowerCase().endsWith(".png")
);

const cards = pngFiles.map(file => {
    const word = path.parse(file).name.toUpperCase();

    // Find the longest matching romaji beginning
    const beginning = Object.keys(kanaMap)
        .sort((a, b) => b.length - a.length)
        .find(key => word.startsWith(key));

    if (!beginning) {
        console.warn(`Skipping unknown word: ${file}`);
        return null;
    }

    return {
        file: `Kaado/${file}`,
        word,
        kana: kanaMap[beginning]
    };
}).filter(Boolean);

await writeFile(
    "./cards.json",
    JSON.stringify(cards, null, 2),
    "utf8"
);

console.log(`Generated ${cards.length} cards from ${folder}/`);
