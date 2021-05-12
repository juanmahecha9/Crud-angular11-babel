import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataForm } from 'src/app/biz/data/admin/dataForm';
import { DataFormService } from 'src/app/services/data.form.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  data: dataForm = new dataForm;

  constructor(public dataService: DataFormService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.dataService.indexGet().subscribe(
      res => {
        console.log(res)
        this.dataService.dataForm = res;
      },
      err => console.log(err)
    )
  }

  editData(id: any) {
    if (confirm("Are you sure yo want to edit it?")) {
      this.router.navigate(['/editar/' + id]);
    }
  }

  deleteData(id: any) {
    if (confirm("Are you sure yo want to delete it?")) {
      this.dataService.indexDelete(id).subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/formulario']);
        },
        err => console.log(err)
      )
    }
  }

  AnulateData(id: any) {
   this.data.status = true;
    this.dataService.indexPut(id, this.data).subscribe(
        res => {
         // console.log(res)
          this.router.navigate(['/lista']);
        },
        err => console.log(err)
    )
  }

}

