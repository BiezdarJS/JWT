import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { LoaderStateEnum } from '../../enums/loader-state';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [NgClass],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  private readonly _state: WritableSignal<LoaderStateEnum | null> = signal(
    LoaderStateEnum.IDLE
  );

  @Input()
  set state(value: LoaderStateEnum | null) {
    this._state.set(value);
  }

  get state(): LoaderStateEnum | null {
    return this._state();
  }
  isLoading: Signal<boolean> = computed(() => {
    const currentState = this._state();
    return currentState === LoaderStateEnum.LOADING;
  });

  public readonly LoaderStateEnum = LoaderStateEnum;
}
