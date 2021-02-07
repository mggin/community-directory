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
  styleUrls: ['./bec-creator.component.css'],
})
export class BecCreatorComponent implements OnInit {
  message = new Message();
  bec = new Bec();
  creating = false;

  constructor(
    private becsHttpService: BecsHttpService,
    public dialogRef: MatDialogRef<BecCreatorComponent>
  ) {}

  ngOnInit(): void {}

  addBec() {
    this.message = new Message();
    if (this.bec.name && this.bec.locations) {
      this.creating = true;
      // this.isCreating = false;
      let success = false;
      this.becsHttpService
        .createBec(this.bec)
        .pipe(
          finalize(() => {
            setTimeout(() => {
              this.creating = false;
              if (success) {
                this.dialogRef.close({ shouldRefresh: true });
              }
            }, 2000);
          })
        )
        .subscribe(
          (HttpResponse) => {
            success = true;
          },
          (HttpError) => {
            this.message.error = `Failed to create bec.`;
          }
        );
    } else {
      this.message.error = `Failed to create bec.`;
    }
  }
}
