from celery import Celery
import time, os
from dotenv import load_dotenv

load_dotenv()

celery = Celery(
    'tasks',
    broker=os.environ['CELERY_BROKER_URL'],
    backend=os.environ['CELERY_RESULT_BACKEND'],
)

@celery.task(name='tasks.example')
def example(prompt):
    time.sleep(10)
    return {'prompt': prompt}
