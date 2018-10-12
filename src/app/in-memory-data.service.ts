import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Cat } from './cat';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const cats = [
            { id: 11, name: 'ねこ', comment: 'オデコの間を撫でたときの顔がションボリーすぎると評判ですがとてもリラックスしてる顔なのでごあんしんください。', no: 'PMUkArCh9T', user: '&mdash; ふーちゃん＠ねこ休み展 (@foochan0711)',  date: '2018年9月1日', userId: 'foochan0711', status: '1035896331171061760' },

            { id: 12, name: 'ねこ2', comment: '私の宝物', no: "N587qou3Tk", user: '&mdash; ホイップ@ねこ休み展 (@HOIPPU_0722)', date: '2018年6月3日', userId: 'HOIPPU_0722', status: '1003089519539675136' },

            { id: 13, name: 'ねこ3', comment: 'やっとウニちゃんのターン！ ', no: "Tau7cqQHRr", user: '&mdash; 京都町家猫カフェ キャットアパートメントコーヒー (@CatApartment)', date: '2018年10月2日', userId: 'CatApartment', status: '1047160605952565248' },

            { id: 14, name: 'ねこ4', comment: 'あっ。昨日おちゅうしゃのとき暴れてたの、ペコちゃんちがうから！ ', no: "cuW6Hw3RiC", user: '&mdash; 京都町家猫カフェ キャットアパートメントコーヒー (@CatApartment)', date: '2018年10月2日', userId: 'CatApartment', status: '1047025298116620288' },

            { id: 15, name: 'ねこ5', comment: 'しょんもりしてるのか、くつろいでるのか、ようわからんロクちゃん。 ', no: "jO0Gr1dsvo", user: '&mdash; 京都町家猫カフェ キャットアパートメントコーヒー (@CatApartment)', date: '2018年10月4日', userId: 'CatApartment', status: '1047856157744713728' },

            { id: 16, name: 'ねこ6', comment: '風の音が怖かったのか、姫がくっついてきたので一緒に転がってたら白目むかれました。 ', no: "9tr0FW14jJ", user: '&mdash; 京都町家猫カフェ キャットアパートメントコーヒー (@CatApartment)', date: '2018年9月30日', userId: 'CatApartment', status: '1046404180854751232' },

            { id: 17, name: 'ねこ7', comment: 'わ、わ！！<br>ルチがうちに来て3年半、初めて2号のお腹の上に乗りました。<br><br>ルッちゃん！乗り心地いかがですか？ ', no: "ffSspJ8SzO", user: '&mdash; 京都町家猫カフェ キャットアパートメントコーヒー (@CatApartment)', date: '2018年9月28日', userId: 'CatApartment', status: '1045541039627366401' },

            { id: 18, name: 'ねこ8', comment: '豆もちの目は、光の具合でちょっとオッドアイになるので不思議。普段は水色です。 ', no: "ddz7uebyed", user: '&mdash; 京都町家猫カフェ キャットアパートメントコーヒー (@CatApartment)', date: '2018年9月28日', userId: 'CatApartment', status: '1045521873302220800' },

            { id: 19, name: 'ねこ9', comment: 'ニコしゃんにおててホールドされて動けない〜。（腕ごとニコチャージ中） ', no: "B9cq8BUimr", user: '&mdash; 京都町家猫カフェ キャットアパートメントコーヒー (@CatApartment)', date: '2018年9月27日', userId: 'CatApartment', status: '1047160605952565248' },

            { id: 20, name: 'ねこ10', comment: '途中から急に忙しくなってアップしそこねちゃったので…あじゅき投下。 ', no: "kUpfZQMvea", user: '&mdash; 京都町家猫カフェ キャットアパートメントコーヒー (@CatApartment)', date: '2018年9月26日', userId: 'CatApartment', status: '1044886117017837568' },
        ];
        return {cats};
    }

    // Overrides the genId method to ensure that a cat always has an id.
    // If the cats array is empty,
    // the method below returns the initial number (11).
    // if the cats array is not empty, the method below returns the highest
    // cat id + 1.
    genId(cats: Cat[]): number {
        return cats.length > 0 ? Math.max(...cats.map(cat => cat.id)) + 1 : 11;
    }
}
