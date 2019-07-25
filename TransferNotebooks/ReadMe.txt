Explication sur les Notebooks
____________________________________________________________________________________________________________
Tous les Notebooks ont un nom de la forme suivante :
"TransferLearning_NomDuModèle_MéthodeDImportation_TypeOutput"

NomDuModèle --> permet de savoir quel type de modèle a été utilisé dans le notebook

MéthodeDimportation --> Il y a deux méthodes d'importation :
            * TensorflowHub (hub) : ne permet d'importer que MobileNetV2 et InceptionV3
                                    avec une version de Tensorflow ultérieure à 2.X
            * Keras Application (keras_imp) : plus de modèles disponibles mais la version 2.2.4 présente un
                                              problème de Batch Normalization et pour notre utilisation en
                                              Fine-Tuning, il fallait utiliser un patch (1)

TypeOutput --> * classification : choix de tourner selon 5 possibiliter (forte droite, droite,
                                  tout droit, gauche et forte gauche)
               * regression : choix de tourner selon un angle de braquage


(1) Plus d'information sur le problème : https://github.com/keras-team/keras/pull/9965
    Il faut retenir que TensorflowHub permet de faire du Fine-Tuning avec la version
    "officielle" de Keras, mais si on utilise Keras application, il faut utiliser le
    patch (disponible au même lien)