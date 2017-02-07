import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import template from './ch-room.template.html';
import styles from './ch-room.stylesheet.scss';
import { ChChatService } from '../../services/ch-chat.service';
import { ChRoomService } from '../../services/ch-room.service';
import { UserService } from '../../../../auth/services/user/user.service';
import './loadingFile.gif';
import { maxUploadLimitInBytes } from '../../../../../config';

@Component({
  selector: 'ch-room',
  template: template,
  styles: [styles]
})
export class ChRoomComponent {
  
  constructor(route: ActivatedRoute, chatService: ChChatService, userService: UserService, roomService: ChRoomService) {
    this.route = route;
    this.chatService = chatService;
    this.roomService = roomService;
    this.messages = [];
    this.messageText = '';
    this.userService = userService;
    this.user = userService.getCurrentUserDetails();
    this.feed = [];
    this.connectedUsers = [];
    this.room = { name: '', icon: '' };
    this.isFileUploading = false;
    this.isFileUploaded = false;
  }
  
  sendMessage() {
    let message = {
      nickname: this.user.nickname,
      avatarUrl: this.user.avatarUrl,
      date: new Date(),
      text: this.messageText,
      hasFile: false,
      file: {}
    };
    this.chatService.sendMessage(message);
    this.messageText = '';
  }
  
  handleUploadFile(event) {
    let file = event.target.files[0];
    if (file.size > maxUploadLimitInBytes) {
      alert('Upload file up to 5MB');
      event.target.value = '';
      return false;
    }
    let fileReader = new FileReader();
    fileReader.onloadstart = (e) => {
      this.isFileUploading = true;
    };
    fileReader.onloadend = (e) => {
      this.isFileUploading = false;
      this.isFileUploaded = true;
      this.fileData = e.target.result;
      this.uploadedFile = file;
    };
    fileReader.readAsArrayBuffer(file);
  }
  
  uploadFileToServer() {
    this.isFileUploaded = false;
    this.chatService.uploadFileToServer(this.uploadedFile, this.fileData).subscribe(
      file => {
        let message = {
          nickname: this.userNickname,
          date: new Date(),
          text: `${this.userNickname} sent file`,
          hasFile: true,
          file: file
        };
        this.chatService.sendMessage(message);
      },
      err => console.log(err)
    );
  }
  
  handleDownloadFileClick(fileObj) {
    this.chatService.downloadFile(fileObj.name, fileObj.date).subscribe(
      res => {
        let blob = new Blob([res.file], { type: fileObj.type });
        let url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      err => console.log(err)
    );
  }
  
  handleIconClick(icon) {
    this.messageText = this.messageText.concat(icon);
  }
  
  ngOnInit() {
    this.routeSubscription = this.route
      .params
      .subscribe(params => {
        this.roomId = params.id;
        this.connectToChat = this.chatService.connectToChat(params.id).subscribe(room => {
          this.room = room;
          this.feed = room.feed;
          this.messages = room.messages;
        });
      });
    this.listenMessages = this.chatService.listenNewMessages().subscribe(
      message => this.messages.push(message)
    );
    this.listenUserConnected = this.chatService.notifyUserConnected().subscribe(
      (data) => {
        this.connectedUsers = data.usersInRoom.slice();
        this.feed = data.feed.slice();
      }
    );
    this.listenUserDisconnected = this.chatService.notifyUserDisconnected().subscribe(
      (data) => {
        this.connectedUsers = data.usersInRoom.slice();
        this.feed = data.feed.slice();
      }
    );
  }
  
  ngOnDestroy() {
    this.connectToChat.unsubscribe();
    this.listenMessages.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.listenUserConnected.unsubscribe();
    this.listenUserDisconnected.unsubscribe();
  }
}
