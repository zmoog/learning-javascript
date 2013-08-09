ibook.WizardView = Backbone.View.extend({

    events: {},

    initialize: function() {

        this.options = {};

        this.options.wizard = {
            buttons: {
                nextText: 'Avanti',
                backText: 'Indietro',
                submitText: 'Conferma',
                submittingText: 'Processando'
            }           
        };

        this.options.uploader = {
            validation: {
                allowedExtensions: ['jpeg', 'jpg', 'gif', 'png', 'tif', 'tiff', 'pdf'],
                sizeLimit: 1024*1024*5
            },
            messages: {
                typeError: "{file} non ha una estensione valida. Le estensioni valide sono: {extensions}.",
                sizeError: "{file} è troppo grande, la dimensione massima del file è {sizeLimit}.",
                minSizeError: "{file} è troppo piccolo, la dimensione minima è {minSizeLimit}.",
                emptyError: "{file} è vuoto.",
                noFilesError: "Non ci sono file da caricare.",
                tooManyItemsError: "Troppi file ({netItems}) da caricare. Il limite è {itemLimit}."
            }
        }
    },

    renderOptions: function(opts, el) {
        var selectOptions = new ibook.OptionsView({el: el});
        selectOptions.render(opts);
    },

    validateUpload: function() { 
        // console.log('validateUpload')
        return false; 
    },

    render: function(data) {

        var that = this;

        this.$el.html(this.template(data));

        this.wizard = this.$el.wizard(this.options.wizard);

        // this.wizard.el.find("#wizard-allowed-types-select").change(function() {
        //  console.log('changed');
        // });
        
        // this.wizard.cards["card-document-type"].on("loaded", function(card) {
        //  console.log('card ' + card + ' has been loaded');
        // });


        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Folder Type Card
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        this.wizard.cards["card-document-type"].on("loaded", function(card) {

            //console.log('card ' + card + ' has been selected');
            var folderSelectEl = card.el.find("#wizard-folder-type-select");
            var documentSelectEl = card.el.find("#wizard-document-type-select");

            var updateDocumentSelectEl = function() {

                var selectedOption = folderSelectEl.find("option:selected").val();

                $.get('data/options.document.'+ selectedOption +'.json', function(opts) { // data.objectId
                    that.renderOptions(opts, documentSelectEl);
                });
            };

            $.get('data/options.folder.1.json', function(opts) { // data.objectId
                that.renderOptions(opts, folderSelectEl);
                updateDocumentSelectEl();
            });

            folderSelectEl.on('change', updateDocumentSelectEl);

            // documentSelectEl.on('change', function() {
            //     card.wizard.setSubtitle(documentSelectEl.find("option:selected").text());
            // });
        });

        this.wizard.cards["card-document-type"].on("deselect", function(card) {
            var documentSelectEl = card.el.find("#wizard-document-type-select");
            card.wizard.setSubtitle(documentSelectEl.find("option:selected").text());
        });

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Document Properties Card
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        if (this.wizard.cards["card-document-properties"]) {
            
            this.wizard.cards["card-document-properties"].on("selected", function(card) {

                $.get('data/properties.json', function(properties) {
                    
                    console.log('properties: ', properties);

                    var inputEl = card.el.find("#wizard-input-document-properties-section");

                    //_.each(properties, function(property, index, list) {

                        inputEl.html(ibook.wizardInputSectionView.render(properties).el);

                    //}); // each

                });


            });

        }

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Scanner Options Card
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        this.wizard.cards["card-scanner-options"].on("loaded", function(card) {

            var feederSelectEl = card.el.find("#wizard-feeder-select");
            var duplexSelectEl = card.el.find("#wizard-duplex-select");
            
            feederSelectEl.on('change', function(){
                var value = feederSelectEl.val();
                if (value == 0) { // 0 - Piatto/Vetro (Una pagina alla volta)
                    duplexSelectEl.val(0); // simplex
                    duplexSelectEl.attr('disabled', 'disabled');
                } else if (value == 1) { // 1 - Automatic Document Feeder (ADF)
                    duplexSelectEl.removeAttr('disabled');
                }

            });

        });

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Document Name Card
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        this.wizard.cards["card-scanner-document-name"].on("validate", function(card) {
            var input = card.el.find("#wizard-scanner-document-name");
            var messagesEl = card.el.find("#wizard-scanner-document-name-messages");
            input.on('change', function(){
                messagesEl.html(ibook.alertView.render(""));
            });
        });

        this.wizard.cards["card-scanner-document-name"].on("loaded", function(card) {
            
            console.log('card loaded');
            
            // var documentSelectEl = card.wizard.el.find("#wizard-document-type-select");
            
            // var documentTypeName = documentSelectEl.find("option:selected").text();

            // var input = card.el.find("#wizard-scanner-document-name");

            // input.val(documentTypeName);

        });

        this.wizard.cards["card-scanner-document-name"].on("selected", function(card) {
            
            console.log('card selected');

            var documentSelectEl = card.wizard.el.find("#wizard-document-type-select");
            
            var documentType = documentSelectEl.find("option:selected").val();
            var documentTypeName = documentSelectEl.find("option:selected").text();

            var input = card.el.find("#wizard-scanner-document-name");
            
            if (documentType !== '2') { // area:d!FRS$FRS$FAX
                
                // input.addClass('uneditable-input');

                input.val(documentTypeName);

                input.attr('disabled', 'disabled');
                console.log('disabled');

            } else {

                if (input.attr('disabled') || !input.val()) {
                    input.val(documentTypeName);
                    input.removeAttr('disabled');
                }

                // // var value = input.val();
                // if (input.attr('disabled')) {
                //     input.val(documentTypeName);
                // }

                // input.removeAttr('disabled');
                // console.log('enabled');


            }

        });

        this.wizard.cards["card-scanner-document-name"].on("validate", function(card) {

            var input = card.el.find("#wizard-scanner-document-name");
            
            var filename = input.val();

            var errors = null;
            
            if (errors) {
                
                var messagesEl = card.el.find("#wizard-scanner-document-name-messages");
                messagesEl.html(ibook.alertView.render({message: errors[0], type: 'alert-error'}).el);
                
                // card.wizard.errorPopover(input, errors[0]);
                
                return false;
            }
            return true;

        });

        this.wizard.cards["card-scanner-document-name"].on("deselect", function(card) {
            console.log('card deselect');
            var messagesEl = card.el.find("#wizard-scanner-document-name-messages");
            messagesEl.html('');
        });

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // File Upload Card
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        this.wizard.cards["card-file-upload"].on("loaded", function(card) {
            
            card.wizard.setNextButton('Fine');

            var uploaderEl = card.el.find("#fine-uploader-basic");
            var messagesEl = card.el.find("#fine-uploader-basic-messages");

            var uploader = new qq.FineUploaderBasic({
                button: uploaderEl[0],
                request: {
                    endpoint: 'fileUpload',
                    inputName: 'uploadingFile',
                    params: {
                        one: 1,
                        two: 'two',
                        three: 'three'
                    }
                },
                multiple: false,
                debug: true,
                messages: that.options.uploader.messages,
                validation: that.options.uploader.validation,
                callbacks: {
                    onError: function(id, name, reason, maybeXhr) { 
                        
                        // console.log('onError', id, name, reason, maybeXhr);

                        messagesEl.html(ibook.alertView.render({message: reason, type: 'alert-error'}).el);

                    },
                    onSubmit: function() { console.log('onSubmit') },
                    onUpload: function() { console.log('onUpload') },
                    onProgress: function() { console.log('onProgress') },
                    onComplete: function() { console.log('onComplete') }
                }
            });

            // console.log(uploader);
        });

        this.wizard.cards["card-file-upload"].on("validate", function(card) {
            
            var uploadedFilenameEl = card.el.find("#fine-uploader-basic-filename");
            var messagesEl = card.el.find("#fine-uploader-basic-messages");

            if (!uploadedFilenameEl.val()) {
                // var uploaderEl = card.el.find("#fine-uploader-basic");
                messagesEl.html(ibook.alertView.render({
                    title: 'Attenzione',
                    message: 'Caricare un file prima di proseguire',
                    type: 'alert-info'
                }).el);
                return false;
            }
            return true;
        });




        this.wizard.show();

        return this;
    }
});