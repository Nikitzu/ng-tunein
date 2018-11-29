import { Component, OnInit, HostBinding } from '@angular/core';
import {isLiked, abbreviate, shorten} from '../../helpers';
import { EbusService } from '../../services/Ebus.service';


@Component({
  selector: '[appCue]',
  templateUrl: './cue.component.html',
  styleUrls: ['./cue.component.scss']
})
export class CueComponent implements OnInit {
  constructor(private bus: EbusService) {}
  @HostBinding('class') cueClass = 'cue';

  song = null;
  loading = true;
  playing = false;
  audio = null;
  prev = null;
  next = null;

  ngOnInit() {
    this.bus.ebus.subscribe(payload => {
      const {song, autoplay} = payload;
      if (song === this.song) {
        return;
      }
      this.loading = true;
      this.prev = this.song;
      if (this.audio) {
        this.pause();
      }
      this.song = song;
      this.audio = new Audio(this.song.preview);
      if (autoplay) {
        this.play();
      }
      if (this.prev) {
        if (this.prev.album.cover_medium === this.song.album.cover_medium) {
          setTimeout(() => {
            this.loading = false;
          }, 50);
        }
      }
      this.audio.addEventListener('ended', () => {
        this.playing = false;
      });
    });
  }

  shorten(a, b) {
    return shorten(a, b);
  }
  play() {
    this.playing = true;
    this.audio.play();
  }
  pause() {
    this.audio.pause();
    this.playing = false;
  }
  goPrev() {
    // if(this.prev)
    // Ebus.$emit('newCue',this.prev,true);
  }
  loadingEnd() {
    this.loading = false;
  }

}
