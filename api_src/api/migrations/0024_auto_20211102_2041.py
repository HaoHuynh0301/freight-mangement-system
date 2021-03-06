# Generated by Django 3.2.6 on 2021-11-02 13:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_order_isdone'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='instanceaddress',
            name='detail_address',
        ),
        migrations.RemoveField(
            model_name='instanceaddress',
            name='province',
        ),
        migrations.AddField(
            model_name='instanceaddress',
            name='latitude',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='instanceaddress',
            name='longitude',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='driver',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.driver'),
        ),
    ]
