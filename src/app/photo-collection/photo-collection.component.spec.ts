import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoCollectionComponent } from './photo-collection.component';

describe('PhotoCollectionComponent', () => {
  let component: PhotoCollectionComponent;
  let fixture: ComponentFixture<PhotoCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoCollectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
