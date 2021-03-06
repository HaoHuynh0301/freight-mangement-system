# Generated by Django 3.2.6 on 2021-09-25 12:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_shipoptions_fee'),
    ]

    operations = [
        migrations.CreateModel(
            name='StatusUpdate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.order')),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.orderstatus')),
            ],
        ),
    ]
