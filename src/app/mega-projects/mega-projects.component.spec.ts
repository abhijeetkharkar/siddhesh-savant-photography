import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MegaProjectsComponent } from './mega-projects.component';

describe('MegaProjectsComponent', () => {
  let component: MegaProjectsComponent;
  let fixture: ComponentFixture<MegaProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegaProjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MegaProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
