# Generated by Django 3.2.6 on 2021-09-14 12:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_order_note'),
    ]

    operations = [
        migrations.CreateModel(
            name='RequestOption',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.order')),
                ('request_option', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.requestoption')),
            ],
        ),
    ]
