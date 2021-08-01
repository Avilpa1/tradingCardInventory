import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actions from '../inventory.actions';
import * as fromInventory from '../inventory.reducer';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {

  cards: Observable<any>;
  cardId = 0;
  form: FormGroup;
  editMode = false;
  noImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'
  totalVal = 0;

  constructor(public store: Store<fromInventory.State>, private http: HttpClient) {
    this.form = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      playerNumber: new FormControl(null, Validators.required),
      teamName: new FormControl(null, Validators.required),
      estimatedValue: new FormControl(null)
    });
    this.cards = this.store.select(fromInventory.selectAll);
  }

  ngOnInit(): void {}

  async addCard(): Promise<any> {
    this.cardId = this.cardId + 1;
    const img = await this.getPlayerImg();
    const card: any = {
      id: this.cardId,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      playerNumber: this.form.controls.playerNumber.value,
      teamName: this.form.controls.teamName.value,
      estimatedValue: this.form.controls.estimatedValue.value,
      img
    };

    this.store.dispatch(new actions.Create(card));
    this.totalEstimatedValue();
    this.clearForm();
  }

  deleteCard(id: any): void {
    this.store.dispatch(new actions.Delete(id));
    this.totalEstimatedValue();
  }

  selectCardToUpdate(card: any): void {
    this.editMode = true;
    const {img, ...partialObject} = card;
    this.form.setValue( partialObject );
    window.scrollTo(0, 0);
  }

  updateCard(): void {
    const card: any = {
      id: this.form.controls.id.value,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      playerNumber: this.form.controls.playerNumber.value,
      teamName: this.form.controls.teamName.value,
      estimatedValue: this.form.controls.estimatedValue.value
    };
    this.store.dispatch( new actions.Update(this.form.controls.id.value, card));
    this.totalEstimatedValue();
    this.clearForm();
  }

  clearForm(): void {
    this.editMode = false;
    this.form.reset();
  }

  openTotal(): void {
    const elm: any = document.getElementById('totalValId');
    if (this.totalVal === 0) {
      elm.style.transform = 'translateX(-30px)';
    } else if (this.totalVal > 999) {
      elm.style.transform = 'translateX(-75px)';
    } else {
      elm.style.transform = 'translateX(-60px)';
    }
  }

  totalEstimatedValue(): void {
    let cardData: any;
    let cardVal = 0;
    this.store.select(fromInventory.selectAll).subscribe( data => cardData = data );
    cardData.forEach((card: any) => {
      cardVal = card.estimatedValue + cardVal;
    });
    this.totalVal = cardVal;
    this.openTotal();
  }

  getPlayerImg(): any {
    const url = 'https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=';
    return new Promise(resolve => {
      this.http.get(`${url}${this.form.controls.firstName.value}%20${this.form.controls.lastName.value}`)
      .subscribe((res: any) => {
        resolve(res.player?.[0].strThumb);
      });
    });
  }

}
