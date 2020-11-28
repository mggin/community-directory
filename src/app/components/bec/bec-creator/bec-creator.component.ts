import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { Bec } from 'src/app/models/bec';
import { Message } from 'src/app/models/message';
import { BecsHttpService } from 'src/app/services/http-services/becs-http.service';

@Component({
  selector: 'app-bec-creator',
  templateUrl: './bec-creator.component.html',
  styleUrls: ['./bec-creator.component.css']
})
export class BecCreatorComponent implements OnInit {
  becName: string;
  isCreating: boolean;
  message = new Message();
  constructor(
    private becsHttpService: BecsHttpService,
    private dialogRef: MatDialogRef<BecCreatorComponent>
  ) { }

  ngOnInit(): void {
    
  }

  addBec() {
    if (this.becName && this.becName.length >= 1) {
      this.isCreating = false;
      this.becsHttpService.createBec({name: this.becName})
      .pipe(finalize(() => {
         this.isCreating = false;
      })).subscribe((HttpResponse) => {
         console.log(HttpResponse)
         this.dialogRef.close({ shouldRefresh: true });
      }, (HttpError) => {
         this.message.error =  `Failed to create bec.`
      })
    }
  }

}
