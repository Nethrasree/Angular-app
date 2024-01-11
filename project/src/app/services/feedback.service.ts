import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedBack } from '../data-type';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
 baseUrl = environment.API_URL+'FeedBack' ;
constructor(private http:HttpClient) { }


getFeedBack() : Observable<FeedBack[]>{
  return  this.http.get<FeedBack[]>(this.baseUrl)
}
addFeedBack(feedback:FeedBack):Observable<FeedBack>
{
  feedback.feedbackId = environment.feedbackId;
  return this.http.post<FeedBack>(this.baseUrl,feedback)
}
updateFeedBack(feedback:FeedBack):Observable<FeedBack>{
  return this.http.put<FeedBack>(this.baseUrl+ '/'+ feedback.feedbackId,feedback);
 }
deleteFeedBack(feedbackId:string):Observable<FeedBack>
{
  return this.http.delete<FeedBack>(this.baseUrl+ '/' + feedbackId);
}
}
