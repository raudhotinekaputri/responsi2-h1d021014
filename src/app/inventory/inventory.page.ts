import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  public _apiService: ApiService;
  dataInventory: any;
  modal_tambah = false;
  id: any;
  nama: any;
  description: any;
  quantity: number = 0;
  modal: any;
  modal_edit = false;

  constructor(
    private apiService: ApiService,
    private modalController: ModalController
  ) {
    this._apiService = apiService;
  }

  ngOnInit() {
    this.getInventory();
  }

  getInventory() {
    this._apiService.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataInventory = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  reset_model() {
    this.id = null;
    this.nama = '';
    this.description = '';
    this.quantity = 0;
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.lihatInventory(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  tambahInventory() {
    if (this.nama != '' && this.description != '') {
      let data = {
        name: this.nama,
        description: this.description,
        quantity: this.quantity,
      };
  
      this._apiService.tambah(data, '/tambah.php')
        .subscribe({
          next: (hasil: any) => {
            this.reset_model();
            console.log('berhasil tambah inventaris');
            this.getInventory();
            this.modal_tambah = false;
            this.modal.dismiss();
          },
          error: (err: any) => {
            console.log('gagal tambah inventaris');
          }
        });
    } else {
      console.log('gagal tambah inventaris karena masih ada data yang kosong');
    }
  }

  hapusInventory(id: any) {
    this._apiService.hapus(id, '/hapus.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getInventory();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      }
    });
  }

 lihatInventory(id: any) {
    this._apiService.lihat(id, '/lihat.php?id=')
      .subscribe({
        next: (hasil: any) => {
          console.log('sukses', hasil);
          let inventory = hasil;
          this.id = inventory.id;
          this.nama = inventory.name;
          this.description = inventory.description;
          this.quantity = inventory.quantity; // Update the quantity value
        },
        error: (error: any) => {
          console.log('gagal ambil data');
        }
      });
  }

  editInventory() {
    let data = {
      id: this.id,
      name: this.nama,
      description: this.description,
      quantity: this.quantity,
    };
  
    this._apiService.edit(data, '/edit.php')
      .subscribe({
        next: (hasil: any) => {
          console.log(hasil);
          this.reset_model();
          this.getInventory();
          console.log('berhasil edit Inventaris');
          this.modal_edit = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal edit Inventaris');
        }
      });
  }
}
