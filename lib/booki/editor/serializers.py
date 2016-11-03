from rest_framework import serializers
from booki.editor.models import Book, BookCover

class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ('url_title', 'title',
                  'hidden', 'description', 'cover'
                 )
class BookCoverSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BookCover
        fields = ('cid', 'title', 'id',
                  'approved', 'notes', 'cover_type'
                 )
