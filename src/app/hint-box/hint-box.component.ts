import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hint-box',
  templateUrl: './hint-box.component.html',
  styleUrls: ['./hint-box.component.scss']
})
export class HintBoxComponent {
  @Input() characteristic: string = '';
  @Input() characterValue: string = '';
  @Input() championValue: string = '';

  // Função para verificar se a característica é comum
  isCommon(): boolean {
    return this.characterValue?.toLowerCase() === this.championValue?.toLowerCase();
  }
}
