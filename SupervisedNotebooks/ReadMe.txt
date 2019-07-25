Explication sur les Notebooks
____________________________________________________________________________________________________________
Tous les Notebooks ont un nom de la forme suivante :
"typeOutput"


TypeOutput --> * classification : choix de tourner selon 5 possibiliter (forte droite, droite,
                                  tout droit, gauche et forte gauche)
               * regression : choix de tourner selon un angle de braquage

A vous de choisir la bonne donnée à load et à train (à augmenter comme bon vous semble) pour avoir un bon modèle

(1) Plus d'information sur le problème : https://github.com/keras-team/keras/pull/9965
    Il faut retenir que TensorflowHub permet de faire du Fine-Tuning avec la version
    "officielle" de Keras, mais si on utilise Keras application, il faut utiliser le
    patch (disponible au même lien)