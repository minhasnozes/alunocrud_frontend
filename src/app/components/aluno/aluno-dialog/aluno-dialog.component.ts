import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlunoService } from '../../../services/aluno.service';
import { Aluno } from '../../../interfaces/aluno';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


@Component({
  selector: 'app-aluno-dialog',
  templateUrl: './aluno-dialog.component.html',
  styleUrls: ['./aluno-dialog.component.css']
})
export class AlunoDialogComponent {
  formulario: FormGroup;
  nome: FormControl;
  sobrenome: FormControl;
  data_nascimento: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {aluno: Aluno, id: string},
    private alunoService: AlunoService) {
      this.nome = new FormControl(data.aluno?.nome || '', [Validators.required]);
      this.sobrenome = new FormControl(data.aluno?.sobrenome || '', [Validators.required]);
      this.data_nascimento = new FormControl(data.aluno?.data_nascimento || '', [Validators.required]);


    this.formulario = new FormGroup({
      nome: this.nome,
      sobrenome: this.sobrenome,
      data_nascimento: this.data_nascimento
    });
  }
  add() {
    // console.log(this.formulario.value)
    this.alunoService.createAluno(this.formulario.value).subscribe(r => {
      console.log(r);
    })
  }
}
