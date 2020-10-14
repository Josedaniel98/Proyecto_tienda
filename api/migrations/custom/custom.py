# Generated by Django 2.2.13 on 2020-08-31 00:26

from django.db import migrations


def migracionRoles(apps, schema_editor):
    Permission = apps.get_model('api', 'Permission')
    Role = apps.get_model('api', 'Role')
    LifeCircle = apps.get_model('api', 'LifeCycle')

    LifeCircle.objects.create(
        name='Lead'
    )
    LifeCircle.objects.create(
        name='Lead calificado por marketing'
    )
    LifeCircle.objects.create(
        name='Lead calificado por ventas'
    )
    LifeCircle.objects.create(
        name='Oportunidad'
    )
    LifeCircle.objects.create(
        name='Cliente'
    )

    industrias = Permission.objects.create(
        name='CRUD industrias'
    )
    usuarios = Permission.objects.create(
        name='CRUD usuarios',
    )
    contactos = Permission.objects.create(
        name='CRUD contactos'
    )
    companias = Permission.objects.create(
        name='CRUD companias'
    )

    admin = Role.objects.create(
        name='Administrador',

    )
    admin.permissions.set([industrias, usuarios, contactos, companias])
    agente = Role.objects.create(
        name='Agente de ventas',

    )
    agente.permissions.set([industrias, usuarios, contactos, companias])
    asistente = Role.objects.create(
        name='Asistente de ventas',

    )
    asistente.permissions.set([industrias, usuarios, contactos, companias])
    gerente = Role.objects.create(
        name='Gerente de ventas',

    )
    gerente.permissions.set([industrias, usuarios, contactos, companias])


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(migracionRoles)
    ]