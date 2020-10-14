"""Custom Command"""

# django
from django.core.management.base import BaseCommand, CommandError
from api.models.contacts import Contact
from api.models.companies import Company
from api.models.lifecycles import LifeCycle
from api.models.industries import Industry

import csv


class Command(BaseCommand):

  help = 'Load csv data'
  def handle(self, *args, **options):
    
    try:
      result = []
      data = open('contacts.csv')
      rows = csv.reader(data)
      for row in rows:
        result.append(row)
        print(row)

      for row in result[1:]:

        i, ci = Industry.objects.get_or_create(
          name=row[7]
        )

        l, cl = LifeCycle.objects.get_or_create(
          name=row[8]
        )

        c, cc = Company.objects.get_or_create(
          name=row[6],
          industry=i
        )
                
        Contact.objects.get_or_create(
          name=row[0],
          email=row[1],
          phone_staff=row[2],
          phone_business=row[3],
          position=row[4],
          client_type=row[5],
          company=c,
          life_cycles=l
        )

    except:
      raise CommandError('something goes wrong')
    
    self.stdout.write(self.style.SUCCESS('the data was load'))