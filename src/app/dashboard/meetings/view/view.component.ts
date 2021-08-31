import { Component, OnInit } from '@angular/core';
//import postscribe from postscribe;
declare const SVPDynamicPlayer: any;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  title: string = 'Night of Destiny Unza';
  host: string = 'Pastor Choolwe';
  id: string = '2odqc617vaas';

  videoScript: string = 'Okey';

  constructor() {}

  ngOnInit(): void {}

  svp() {
    var vars = {
      clip_id: '2odqc617vaas',
      transparent: 'true',
      pause: '1',
      repeat: '',
      bg_color: '#ffffff',
      fs_mode: '2',
      no_controls: '',
      start_img: '0',
      start_volume: '34',
      close_button: '',
      brand_new_window: '1',
      auto_hide: '1',
      stretch_video: '',
      player_align: 'NONE',
      offset_x: '0',
      offset_y: '0',
      player_color_ratio: 0.6,
      skinAlpha: '50',
      colorBase: '#250864',
      colorIcon: '#ffffff',
      colorHighlight: '#7f54f8',
      direct: 'false',
      is_responsive: 'true',
      viewers_limit: 0,
      cc_position: 'bottom',
      cc_positionOffset: 70,
      cc_multiplier: 0.03,
      cc_textColor: '#ffffff',
      cc_textOutlineColor: '#ffffff',
      cc_bkgColor: '#000000',
      cc_bkgAlpha: 0.1,
      aspect_ratio: '16:9',
      play_button: '1',
      play_button_style: 'pulsing',
      sleek_player: '1',
      floating_player: 'none',
    };
    var svp_player = new SVPDynamicPlayer(
      'svp_player2odqc617vaas',
      '',
      '100%',
      '100%',
      { use_div: 'svp_player2odqc617vaas', skin: '3' },
      vars
    );
    svp_player.execute();
  }
}
