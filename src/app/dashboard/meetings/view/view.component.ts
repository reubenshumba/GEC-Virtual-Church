import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
//import postscribe from postscribe;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  title: string = 'Night of Destiny Unza';
  host: string = 'Pastor Choolwe';
  meetingURL: string =
    'https://play.webvideocore.net/popplayer.php?it=f0vpbk6p814o&is_link=1&w=720&h=405&pause=1&title=AUGUST+PARTNERS+SERVICE&skin=3&repeat=&brandNW=1&start_volume=34&bg_gradient1=%23ffffff&bg_gradient2=%23e9e9e9&fullscreen=1&fs_mode=2&skinAlpha=50&colorBase=%23250864&colorIcon=%23ffffff&colorHighlight=%237f54f8&direct=false&no_ctrl=&auto_hide=1&viewers_limit=0&cc_position=bottom&cc_positionOffset=70&cc_multiplier=0.03&cc_textColor=%23ffffff&cc_textOutlineColor=%23ffffff&cc_bkgColor=%23000000&cc_bkgAlpha=0.1&image=https%3A%2F%2Fmember.streamingvideoprovider.com%2Fpanel%2Fserver%2Fclip%3Fa%3DGenerateThumbnail%26clip_id%3D4274627%26size%3Dlarge&mainBg_Color=%23ffffff&aspect_ratio=16%3A9&play_button=1&play_button_style=pulsing&sleek_player=1&stretch=&auto_play=&auto_play_type=unMute&floating_player=none';

  constructor(private meetingService: MeetingService, private router: Router) {}

  ngOnInit(): void {}
}
