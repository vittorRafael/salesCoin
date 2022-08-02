import { Platform, StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import React, {useEffect, useState} from 'react';

import CurrentPrice from './src/components/CurrentPrice';
import HistoryGraphic from './src/components/HistoryGraphic';
import QuotationList from './src/components/QuotationList';
import QuotationItems from './src/components/QuotationList/QuotationsItems';

function addZero(number){
  if(number <= 9){
    return "0" + number
  }else{
    return number
  }
}

function url(qtdDays){
  const data = new Date()
  const listLastDays = qtdDays
  const endDate = `${data.getFullYear()}-${addZero(data.getMonth() + 1)}-${addZero(data.getDate())}`;
  data.setDate(data.getDate() - listLastDays)
  const startDate = `${data.getFullYear()}-${addZero(data.getMonth() + 1)}-${addZero(data.getDate())}`;
  return `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
}

async function getListCoins(url){
  let response = await fetch(url);
  let returnApi = await response.json()
  let selectListQuotations = returnApi.bpi
  if (selectListQuotations){
    const queryCoinsList = Object.keys(selectListQuotations).map((key)=>{
      return {
        data: key.split("-").reverse().join("/"),
        valor: selectListQuotations[key]
      }
    })
  
    let data = queryCoinsList.reverse()
     return data;
  }else{
    return null
  }
}

async function getPriceGraphic(url){
  let responseG = await fetch(url);
  let returnApiG = await responseG.json()
  let selectListQuotationsG = returnApiG.bpi
  
  if(selectListQuotationsG){
    const queryCoinsListG = Object.keys(selectListQuotationsG).map((key)=>{
      return selectListQuotationsG[key]
    })
  
    let dataG = queryCoinsListG
    return dataG;
  }else{
    return null
  }

}

export default function App() {

  const [coinsList, setCoinsList] = useState([])
  const [coinsGraphicList, setCoinsGraphicList] = useState([0])
  const [days, setDays] = useState(30)
  const [updateData, setUpdateData] = useState(true);
  const [price, setPrice] = useState();

  function priceCotation(){
    if(!price){
      setPrice(coinsGraphicList.pop())
    }
  }


  function updateDay(number){
    setDays(number)
    setUpdateData(true)
  }

  useEffect(()=>{
    getListCoins(url(days)).then((data)=>{
      if(data){
        setCoinsList(data)
      }else{
        setUpdateData(false)
      }

    })

    getPriceGraphic(url(days)).then((dataG)=>{
      if(dataG){
        setCoinsGraphicList(dataG)
      }else{
        setUpdateData(false)
      }

    })

    priceCotation()

    if(updateData){
      setUpdateData(false)
    }
  }, [updateData])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#144d93" barStyle="light-content"/>
      <CurrentPrice  lastCotation={price}/>
      <HistoryGraphic infoData={coinsGraphicList} />
      <QuotationList filterDay={updateDay} listTransactions={coinsList}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? 40 : 0
  },
});
