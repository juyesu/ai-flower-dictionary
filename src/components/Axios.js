"use client"
import { useEffect, useState } from "react";
import Axios from "axios";
import ItemList from "./ItemList";

export default function AxiosComponent() {
    const [list, setList] = useState([]);

    const GARDEN_API_URL =
        "https://apis.data.go.kr/B554620/gardenPrntInfoService/getGardenPrntInfoList?serviceKey=sL7tbaOTpeVYTaIXr22d8usE%2FX0BGm8MmIKamsm%2B%2BqYtrxj%2BPgUqop7AJuJlUjhiEsJzYzdRHjRkXgAnVI7TeA%3D%3D&pageNo=1&numOfRows=10&type=json";
    
    function getData() {
        Axios.get(GARDEN_API_URL).then((res) => {
            console.log(res.data);
            setList(res.data.response.body.items.item);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <ItemList list={list} />
        </div>
    )
}