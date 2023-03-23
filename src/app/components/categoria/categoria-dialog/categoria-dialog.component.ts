import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '../../../interfaces/categoria';
import { CategoriaService } from '../../../services/categoria.service';





@Component({
  selector: 'app-categoria-dialog',
  templateUrl: './categoria-dialog.component.html',
  styleUrls: ['./categoria-dialog.component.css'],
})


export class CategoriaDialogComponent {
  formulario: FormGroup;
  id: FormControl;
  nome: FormControl;
  durationInSeconds = 5;
  // datepickerControl = new MatDatepickerControl<any>(this.myControl);
  numero = 1;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { categoria: Categoria, id: string, parent: any },
    private categoriaService: CategoriaService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CategoriaDialogComponent>
  ) {

    this.nome = new FormControl(data.categoria?.nome || '', [Validators.required]);

    if (data.categoria) {
      this.id = new FormControl(data.categoria.id)
      this.formulario = new FormGroup({
        id: this.id,
        nome: this.nome,
      });
    } else {
      this.formulario = new FormGroup({
        nome: this.nome,
      });
    }
  }
  add() {
    if (this.data.categoria) {
      this.categoriaService.updateCategoria(this.formulario.value).subscribe(r => {
        this._snackBar.open('Categoria Editado');
        this.dialogRef.close(true);
        this.dialogRef.afterClosed().subscribe(result => {
          this.data.parent.parentComponentMethod(result); // chama o método do componente pai com o resultado
        });
      });
    } else {
      this.categoriaService.createCategoria(this.formulario.value).subscribe(r => {
        this._snackBar.open('Categoria cadastrado');
        this.dialogRef.close(true);
        this.dialogRef.afterClosed().subscribe(result => {
          this.data.parent.parentComponentMethod(result); // chama o método do componente pai com o resultado
        });
      });
    }
  }

  closeModal() {
    this.dialogRef.close(true);
  }
}

