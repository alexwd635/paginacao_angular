paginacao(){
    this.openPagination = true;
    this.pages = 5;
    let totalPages = this.totalArquivos / 10;
    this.numbersPages = [];
    for (let index = 1; index <= totalPages; index++) {
      this.numbersPages.push(index);
    }
    if(this.pagination.limit > 10){
      this.paginaAtual()
    }else{
      this.qtdItens = this.numbersPages.slice(0, this.pages);
    }

  }

  next(){
    let lastnumber = this.qtdItens[this.qtdItens.length - 1];
    this.qtdItens = this.numbersPages.slice(lastnumber, lastnumber + this.pages);
    
    if(this.qtdItens[this.qtdItens.length - 1] >= this.numbersPages.length){
      this.openNext = false 
    }

    if(this.qtdItens[this.qtdItens.length - 1] > this.pages){
      this.openPrev = true
    }
  }

  prev(){
    let lastnumber = this.qtdItens[this.qtdItens.length - 1];
    this.qtdItens = this.numbersPages.slice((lastnumber - this.pages) - this.pages, lastnumber - this.pages)

    if((lastnumber - this.pages) - this.pages < this.pages){
      this.openNext = true
    }

    if(this.qtdItens.length < this.pages){
      this.openPrev = false
      this.qtdItens = this.numbersPages.slice(0, this.pages);
    }

    if(this.qtdItens[this.qtdItens.length - 1] <= this.numbersPages.length){
      this.openNext = true; 
    }
  }

  paginaAtual(){
    let page = this.pagination.limit / 10;
    this.qtdItens = this.numbersPages.slice(page-1, page + this.pages);
  }

  paginar(val){
    let numberPagination = val * 10;

    let botao = document.querySelectorAll('ul.paginacao button');
    botao.forEach(element => {
      element.classList.remove('destaque-texto')
    });
    
    document.querySelector('.button-'+val).classList.add('destaque-texto');
    
    this.ordenarpage = {
      limit: numberPagination,
      offset: this.pagination.offset,
      order: this.ordenCols
    }

    this.isLoadingResults = true;
    this.arquivosService.getSmartArq(this.ordenarpage , this.tipoPainel, this.tipoArquivosSelect, this.cnpjEmit)
      .subscribe(response => {
        this.arquivos = response.data;
        this.isLoadingResults = false;
      });
  }
