import BgRemove from "./bg-remove";
import BackgroundReplace from "./bg-replace";
import ExtractPart from "./extract-part";
import GenRemove from "./gen-remove";
import GenerativeFill from "./generative-fill";
import AIRecolor from "./recolor";

export default function ImageTools() {
    return(
        <>
        <GenRemove />
        <BgRemove />
        <BackgroundReplace />
        <GenerativeFill />
        <ExtractPart />
        <AIRecolor />
        </>
    )
}