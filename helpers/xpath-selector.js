import { Selector } from 'testcafe';

export default function XPathSelector(xpath) {
    return Selector(() => {
        const result = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        return result.singleNodeValue;
    }, { dependencies: { xpath } });
}
