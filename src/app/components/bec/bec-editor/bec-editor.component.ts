import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { BecProps, MemberProps } from 'src/app/interfaces';
import { BecsHttpService } from 'src/app/services/http-services/becs-http.service';

@Component({
  selector: 'app-bec-editor',
  templateUrl: './bec-editor.component.html',
  styleUrls: ['./bec-editor.component.css'],
})
export class BecEditorComponent implements OnInit {
  bec: Partial<BecProps>;
  updating = false;
  becsDetail: any;
  constructor(
    private becHttpService: BecsHttpService,
    public dialogRef: MatDialogRef<BecEditorComponent>
  ) {}

  ngOnInit(): void {
    this.becsDetail = this.becHttpService.getBecDetails(this.bec.id);
  }

  updateBecDetail() {
    this.updating = true;
    this.becHttpService
      .updateBec(this.bec.id, this.bec)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.updating = false;
            this.dialogRef.close({ shouldRefresh: true });
          }, 2000);
        })
      )
      .subscribe((HttpResponse) => {
        console.log({ HttpResponse });
      });
  }
}
