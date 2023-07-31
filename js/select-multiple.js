
$(function () {

    const init = () => {
        const selectAll = document.querySelectorAll("kt-select");
        Array.from(selectAll).map((x, index) => {
            const select = $(x);
            select.attr('max', 1);
            if(select.attr('id').length == 0) {
                select.attr('id', `ktselect-${index}`);
            }
            const selectores = $(select).children('kt-options');
            $(selectores).attr('id', `ktoptions-${index}`);
            const selectValue = $(select).children('kt-select-value');
            let valorSelect = '';
            agregarCheck($(selectores).children(), `kt${index}`);

            if(select.attr('placeholder') != undefined && select.attr('placeholder') != '') {
                valorSelect = select.attr('placeholder');
                selectValue.addClass('kt-marcador');
            } else {

                const option = $(selectores).children("kt-option[select]");
                if(option.length > 0) {
                    const hijoCheck = $(option).children('div').children('input');
                    $(hijoCheck).attr('checked', '');
                    valorSelect = $(option).text().trim();
                } else {
                    selectValue.addClass('kt-marcador');
                    valorSelect= 'Selection...';
                }

            }

            selectValue.attr('data-content', valorSelect);

            createBodyOptionMobile(select);
        
        })
    }

    const createBodyOptionMobile = (select) => {
        const optionsCopy = $(select).children('kt-options');
        const element = document.createElement('kt-options-mobile');
        element.classList.add('close')
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('div-options');
        const clon = optionsCopy[0].cloneNode(optionsCopy[0]);
        $(optionsCopy).remove();
        clon.classList.remove('close');
        elementDiv.append(clon);
        const elementBtn = document.createElement('button');
        elementBtn.classList.add('btn-select-multiple');
        elementBtn.innerHTML = 'Agregar';
        elementDiv.append(elementBtn);
        element.append(elementDiv);
        $(select).append(element);
    }

    const agregarCheck = (options, id) =>{
        const div = `<label for="checkbox-${id}-@id"><input id="checkbox-${id}-@id" type="checkbox">@value</label>`
        Array.from(options).map((x)=>{
            const key = $(x).attr('key');
            const texto = $(x).text();
            const auxDiv = div.replace('@value', texto).replace('@id', key).replace('@id', key);
            $(x).html('');
            $(x).html(auxDiv);
        })
    }
    
    init();

    $("kt-select-value").click(function(event){
        const select = $(event.target).parent();
        $(select).click();
    })

    $("kt-select").click(function(event){
        if(event.target.localName == 'kt-select' || event.target.localName == 'i') {
            const idOptions =  $(this).children('kt-options-mobile').children('div').children('kt-options').attr('id');

            const optionsAll = $('kt-options');
            let elementSelect = '';
            [...optionsAll].map((x)=> {
                const parent = $(x).parent().parent();
                if($(x).is('kt-options[id='+idOptions+']')) {
                    if($(parent).hasClass('close')) {
                        $(parent).removeClass('close');
                    } else {
                        $(parent).addClass('close');
                    }
                } else {
                    $(parent).addClass('close');
                }
            })

            const SelectAll = $('kt-select');
            [...SelectAll].map((x)=> {
                $(x).removeClass('focus');
            });
        }
    })


    $('input[type=checkbox]').change((event)=>{
        const isCheck = $(event.target).is(':checked');
        const grand = $(event.target).parent().parent();

        if(isCheck) {
            grand.attr('select', true);
            processValue(grand);
        } else {
            grand.removeAttr('select');
            processValue(grand);
        }
    });

    processValue = (element) => {
        let arrayText = [];
        const parent = element.parent();
        const optSelect = $(parent).children("kt-option[select]");
        Array.from(optSelect).forEach(item => {
            arrayText.push($(item).text().trim())
        });

        const parents = parent.parent().parent().parent();
        const selectValue = $(parents).children('kt-select-value');
        let valorSelect = '';
        $(selectValue).removeClass('kt-marcador');
        if(arrayText.length > 1) {
            valorSelect = `${arrayText.length} Select...`
        } else if(arrayText.length == 1)  {
            valorSelect = arrayText[0];
        } else {
            if($(parents).attr('placeholder') != undefined && $(parents).attr('placeholder') != '') {
                valorSelect = $(parents).attr('placeholder');
            } else {
                valorSelect= 'Selection...';
            }
            $(selectValue).addClass('kt-marcador');
        }
        
        $(selectValue).attr('data-content', valorSelect);

        const max = $(parents).attr('max');
        if(max != undefined && max > 0) {
            if(arrayText.length == max) {
                desactivarOption(parent);
            } else {
                activarOption(parent);
            }
        }
    }

    desactivarOption = (parent) => {
        const option = $(parent).children("kt-option");
        Array.from(option).map((x)=> {
            if(!$(x).attr('select')) {
                $(x).children().children().attr('disabled', true);
            }
        })
    }

    activarOption = (parent) => {
        const option = $(parent).children("kt-option");
        Array.from(option).map((x)=> {
            if(!$(x).attr('select')) {
                const child = $(x).children().children()
                if(child.attr('disabled')) {
                    child.removeAttr('disabled');
                }
                    
            }
        })

    }

    $(document).click(function(event){
        let isElement = false;
        if(event.target.localName == 'kt-select') {
            isElement = true;
        }
        if(event.target.localName == 'kt-select-value') {
            isElement = $(event.target).parent().is('kt-select');
        }
        if(event.target.localName == 'i') {
            isElement = $(event.target).parent().parent().is('kt-select');
        }
        if(event.target.localName == 'label') {
            isElement = $(event.target).parent().is('kt-option');
        }
        if(event.target.localName == 'input') {
            isElement = $(event.target).parent().parent().is('kt-option');
        }
        
        if(!isElement) {
            const options = $('kt-options');
            const select = $('kt-select');
            $(options).parent().parent().addClass('close');
            $(select).removeClass('focus');

        }
    })


})