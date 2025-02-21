import RendererUtils from './rendererUtils';

export default class {
    /**
     * 교과형 / 일반형 변경
     * 교과형으로 변경시에는 lang 이 강제로 ko 로 고정된다.
     * TODO ko 로 진입하는 것이 불법접근인데 필요한 방어코드인지 고려
     * @param mode{string} workspace | practical_course
     */
    static async changeEntryStatic(mode?: string) {
        let defaultEntryStatic;
        if (mode === 'practical_course') {
            if (window.Lang && RendererUtils.getLangType() !== 'ko') {
                (async() => await this.changeLang('ko'))();
            }
            defaultEntryStatic = await import('../resources/static_mini.js');
        } else {
            defaultEntryStatic = await import('../resources/static.js');
        }
        defaultEntryStatic = defaultEntryStatic.default;
        window.EntryStatic = defaultEntryStatic || window.EntryStatic;
    }

    /**
     * 엔트리 오프라인에서는 다운로드 버튼이 열기 버튼으로 바뀐다. 이를 강제 치환 후,
     * 해당 블록 함수의 프로토타입 자체를 치환해버리는 코드를 가지고 있다.
     * @param lang
     * @return {Promise<void>}
     */
    static async changeLang(lang: string) {
        window.Lang = require(`../resources/lang/${lang}.json`);
        window.initNativeMenu();
    }
}
