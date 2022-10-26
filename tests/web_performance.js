import fetch from 'node-fetch';
import { performance } from 'perf_hooks';

//APIのURL
const base_url = "https://xxxxxxxxxxxxx.on.drv.tw/website";

//各種変数
const loop = 10; //ループ回数（測定する回数）
let sumTime = 0; //合計時間

//計測処理
(async () => {
    //ループ
    for (let i = 0; i < loop; i++) {

        //開始時間取得
        const startTime = performance.now();

        //リクエスト
        const response = await fetch(base_url);

        console.log(response.status); //コンソールに出力

        //終了時間取得
        const endTime = performance.now();
        // レスポンス時間計測（ミリ秒を秒に直す）
        const responseTime = (endTime - startTime) / 1000;
        //合計時間を合算
        sumTime += responseTime;
        //レスポンジ時間出力
        console.log(responseTime);
    }

    //合計出力
    console.log("sum=" + sumTime);
    //平均出力
    console.log("ave=" + sumTime / loop);

})();