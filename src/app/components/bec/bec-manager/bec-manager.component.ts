import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BecProps } from 'src/app/interfaces';
import { Bec } from 'src/app/models/bec';
import { Message } from 'src/app/models/message';
import { BecsHttpService } from 'src/app/services/http-services/becs-http.service';
import { BecCreatorComponent } from '../bec-creator/bec-creator.component';
import { BecEditorComponent } from '../bec-editor/bec-editor.component';

@Component({
  selector: 'app-bec-manager',
  templateUrl: './bec-manager.component.html',
  styleUrls: ['./bec-manager.component.css'],
})
export class BecManagerComponent implements OnInit {
  becs: any;
  message = new Message();
  constructor(
    private becHttpServie: BecsHttpService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<BecManagerComponent>
  ) {}

  ngOnInit(): void {
    this.getBecs();
  }

  getBecs() {
    this.becs = this.becHttpServie.getBecs();
  }

  openBecEditor(bec: BecProps) {
    const dialogRef = this.dialog.open(BecEditorComponent, {
      width: '20vw',
      disableClose: true,
    });

    dialogRef.componentInstance.bec = JSON.parse(JSON.stringify(bec));

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result['shouldRefresh']) {
        this.getBecs();
      }
    });
  }

  openBecCreator() {
    const dialogRef = this.dialog.open(BecCreatorComponent, {
      width: '20vw',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result['shouldRefresh']) {
        this.getBecs();
      }
    });
  }

  deleteBec(bec: BecProps) {
    if (confirm(`Are you sure you want to delete ${bec.name}`)) {
      this.becHttpServie.removeBec(bec.id).subscribe(
        (HttpResponse) => {
          this.getBecs();
        },
        (HttpError) => {
          this.message.error = `Failed to remove the B.E.C ${bec.name}!`;
        }
      );
    }
  }
}
