import { Component } from '@angular/core';

type web = {
  id: number;
  name: string;
  url: string;
  selector: Array<string>;
}

type newsContent = {
  text: string;
  audio: string;
}

type news = {
  webId: number;
  newsId: number;
  newsDet: Array<newsContent>;
  oneaudio: string;
  audioGen: string;
  videoGen: string;
  postVideo: string;

}

type content = {
  web: Array<web>;
  newsObject: Array<news>;
}

type f2 = {
  result: string;
}

type jsnews = {
text: string;
audio: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'news-app';

  fetchobject = <content>{}
  fetchobject2  = <f2>{}
  web: Array<web> = []
  newsObject: Array<news> = []
  clickweb:boolean = false
  newsbutclick:boolean = false
  webid:number = 0
  index:number = 0
  webname:string =''
  newsDet: Array<newsContent> = []
  filename:string = ''
  videoBool:boolean = false
  addNewsBool = true
  loadbool = false

  async displayWebsite(){

      await this.fetchfunction('http://localhost:8588/getjson', {})
      const contentJson: content = this.fetchobject
      this.web = contentJson.web
      this.newsObject = contentJson.newsObject
      this.clickweb = !this.clickweb
  
  }

  async fetchfunction(url: string, body: Object) {

    const sendreq = await fetch (url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    const fetchobject = await sendreq.json()
    if( Object.keys(fetchobject).length === 1 ) {
      this.fetchobject2 = fetchobject
    }
    else{ this.fetchobject = fetchobject }

  }

  async showNews(event:number){

    await this.fetchfunction('http://localhost:8588/getjson', {})
    const contentJson: content = this.fetchobject
    const web: Array<web> = contentJson.web
    const newsObject: Array<news> = contentJson.newsObject
    const index: number = newsObject.length - this.web.length
    this.getnewsObject (event,index,newsObject,web)
    
  }

  getnewsObject (webid: number,index: number,newsObject: Array<news>,web: Array<web>) {
    if (this.newsbutclick === false && this.webid !== webid ){
      this.newsbutclick = !this.newsbutclick
    }
    for (let j = index; j < newsObject.length; j++) {
      if (newsObject[j].webId !== webid) { continue }
      this.newsDet = newsObject[j].newsDet
      this.webname = web[webid-1].name
      this.webid = webid
      this.index = j
      this.dislayotherdet (j,newsObject)
    }
  }

  dislayotherdet (index: number,newsObject: Array<news>){
    if(newsObject[index].videoGen === 'yes'){
      this.filename = newsObject[index].oneaudio
      this.videoBool = true
    }
    else if (newsObject[index].videoGen === 'no'){this.videoBool = false}
    if(newsObject[index].audioGen === 'yes'){this.addNewsBool = false}
    else if (newsObject[index].audioGen === 'no'){this.addNewsBool = true}
    this.newsbutclick = true
  }
  

  async addNews(event:{ind:number,ntext:string}){

    const getNews: string = event.ntext
    

    await this.fetchfunction('http://localhost:8588/getjson', {})
    const contentJson = this.fetchobject
    const newsObject = contentJson.newsObject
    const objectInd = event.ind
    const newsDet = newsObject[objectInd].newsDet
    const newsId = newsObject[objectInd].newsId
    const index = newsDet.length

    const date = new Date().toString().replace(/[{(+)}]|GMT|0530|India Standard Time| /g, '')
    const fileName = 'voice/NewsId:' + newsId + '-index:' + index + '-' + date + '.wav'

    const detail = <jsnews>{}
    detail.text = getNews
    detail.audio = fileName
    newsDet[index] = detail

    this.newsDet = newsDet
    await this.fetchfunction('http://localhost:8588/updatejson', contentJson)
    const response = this.fetchobject2.result
    alert(response)
   
  }

  async audioGen (index: number) {
    this.addNewsBool = false
    await this.fetchfunction('http://localhost:8588/getjson', {})
    const contentJson = this.fetchobject
    const newsObject = contentJson.newsObject
    const objectInd = index
  
    if (newsObject[objectInd].audioGen === 'yes') { alert('Audio Already Generated') } else {
      alert('Audio Generation started')
      this.loadbool = true
      const data = {"ind":index}
      await this.fetchfunction('http://localhost:8588/generateaudio', data)
      const response = this.fetchobject2.result
      this.loadbool = false
      alert(response)
    }
  }

  async  videoGen (index: number) {
    await this.fetchfunction('http://localhost:8588/getjson', {})
    const contentJson = this.fetchobject
    const newsObject = contentJson.newsObject
    const objectInd = index
   

    if (newsObject[objectInd].videoGen === 'yes') { alert('Video Already Generated') } else if (newsObject[objectInd].audioGen === 'no') { alert('Audio is not yet Generated') } else {
      
      this.filename = `${newsObject[index].oneaudio}.mp4`
      alert('Video Generation started')
      this.loadbool = true
      const data = {"ind":index}
      await this.fetchfunction('http://localhost:8588/generatevideo', data)
      const response = this.fetchobject2.result
      this.loadbool = false
      alert(response)
      this.videoBool =true
    }
  }

  async postVideo (index: number) {
    await this.fetchfunction('http://localhost:8588/getjson' ,{})
    const contentJson = this.fetchobject
    const newsObject = contentJson.newsObject
    const objectInd = index
  
    if (newsObject[objectInd].postVideo === 'yes') { alert('Video Already Posted') } else if (newsObject[objectInd].videoGen === 'no') { alert('Video is not yet Generated') } else {
      alert('Video Posting started')
      this.loadbool = true
      const data = {"ind":index}
      await this.fetchfunction('http://localhost:8588/postvideo', data)
      const response = this.fetchobject2.result
      this.loadbool = false
      alert(response)
    }
  }



}
